const loadCommentBtnElement = document.getElementById('load-comments-btn');
const commentSectionElement = document.getElementById('comments');
const commentFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

function createCommentsList(comments) {
  const commentsListElement = document.createElement('ol');

  for (const comment of comments) {
    const commetsElement = document.createElement('li');
    commetsElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>  
    `;
    commentsListElement.appendChild(commetsElement);
  }
  return commentsListElement;
}

async function fetchCommentForPost() {
  const postId = loadCommentBtnElement.dataset.postid;
  try {
    const response = await fetch(`/posts/${postId}/comments`);
    if (!response.ok) {
      alert('Error!!');
      return;
    }
    const responseData = await response.json();

    if (!responseData || responseData.length === 0) {
      commentSectionElement.firstElementChild.textContent =
        'We could not find any comment, Maybe add one?';
    } else {
      const commentsListElement = createCommentsList(responseData);
      commentSectionElement.innerHTML = '';
      commentSectionElement.appendChild(commentsListElement);
    }
  } catch (error) {
    alert(error);
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = {
    title: enteredTitle,
    text: enteredText,
  };
  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      alert('Error!!');
    } else {
      fetchCommentForPost();
    }
  } catch (error) {
    alert(error);
  }
}

loadCommentBtnElement.addEventListener('click', fetchCommentForPost);
commentFormElement.addEventListener('submit', saveComment);
