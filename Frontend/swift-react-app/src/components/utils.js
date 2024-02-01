// eslint-disable-next-line
export const getCookie = (name) => {
  let cookieValue = null;
  console.log("Document Cookies:", document.cookie);

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

export const fetchData = async () => {
  let cookie = null;
  try {
    const response = await fetch('https://swiftly-tasks.vercel.app/swiftlytasks/login/', {
      method: 'GET',
      credentials: 'include'
    });

    const responseData = await response.json();

    cookie = responseData.message;

  } catch (error) {
    console.error('Error retrieving CSRF token:', error);
  }
  return cookie;
};

