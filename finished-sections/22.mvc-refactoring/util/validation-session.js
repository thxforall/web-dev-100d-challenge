export function getSessionErrorData(req, defaultValue) {
  let sessionErrorData = req.session.inputData;

  if (!sessionErrorData) {
    sessionErrorData = {
      hasError: false,
      ...defaultValue,
    };
  }

  req.session.inputData = null;

  return sessionErrorData;
}

export function flashErrorsToSession(req, data, action) {
  req.session.inputData = {
    hasError: true,
    ...data,
  };

  req.session.save(action);
}
