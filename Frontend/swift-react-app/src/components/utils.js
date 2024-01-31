// eslint-disable-next-line
export const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    console.log("Cookies:", document.cookie);
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const getCSRFTokenFromHeaders = (headers) => {
  const csrfTokenHeader = headers.get('X-CSRF-Token');
  return csrfTokenHeader ? csrfTokenHeader : null;
};
