import User from '../models/user.model';
import {
  createUserSession,
  deleteUserAuthSession,
} from '../util/authentication';
import { emailIsConfirmed, inputDetailsAreValid } from '../util/validation';
import { getSessionData, flashDataToSession } from '../util/session-flash';

export function getSignUp(req, res) {
  let sessionData = getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullName: '',
      street: '',
      postal: '',
      city: '',
    };
  }

  res.render('customer/auth/signup', { inputData: sessionData });
}

export async function postSignup(req, res, next) {
  const inputData = req.body;
  const enteredData = {
    email: inputData.email,
    confirmEmail: inputData['confirm-email'],
    password: inputData.password,
    fullName: inputData.fullName,
    street: inputData.street,
    postal: inputData.postal,
    city: inputData.city,
  };

  if (
    !inputDetailsAreValid(
      inputData.email,
      inputData.password,
      inputData.fullName,
      inputData.street,
      inputData.postal,
      inputData.city,
    ) ||
    !emailIsConfirmed(inputData.email, inputData['confirm-email'])
  ) {
    flashDataToSession(
      req,
      {
        errorMessage: 'Please Check yout input. Password ...',
        ...enteredData,
      },
      function () {
        res.redirect('/signup');
      },
    );
    return;
  }

  const user = new User(
    inputData.email,
    inputData.password,
    inputData.fullName,
    inputData.street,
    inputData.postal,
    inputData.city,
  );

  try {
    const existsAlready = await user.existingAlready();

    if (existsAlready) {
      flashDataToSession(
        req,
        {
          errorMessage: 'Already has email',
          ...enteredData,
        },
        function () {
          res.redirect('/signup');
        },
      );
      return;
    }

    await user.signUp();
  } catch (error) {
    next(error);
  }

  res.redirect('/login');
}

export function getLogin(req, res) {
  let sessionData = getSessionData(req);

  if (!sessionData) {
    sessionData = { email: '', password: '' };
  }
  res.render('customer/auth/login', { inputData: sessionData });
}

export async function postLogin(req, res, next) {
  const inputData = req.body;
  const user = new User(inputData.email, inputData.password);
  let existingUser;

  try {
    existingUser = user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  const sessionErrorData = {
    errorMessage: 'Please double Check your email, password',
    email: inputData.email,
    password: inputData.password,
  };

  if (!existingUser) {
    flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
    return;
  }

  const passwordIsMatched = await user.hasMatchingPassword(
    existingUser.password,
  );

  if (!passwordIsMatched) {
    flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
    return;
  }

  createUserSession(req, existingUser, function () {
    res.redirect('/');
  });
}

export function logout(req, res) {
  deleteUserAuthSession(req);
  res.redirect('/');
}
