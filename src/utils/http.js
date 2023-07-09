async function get (url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  get
};
