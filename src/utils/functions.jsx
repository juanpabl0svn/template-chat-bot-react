async function getEntryValue(message) {
  try {
    const req = await fetch(`http://localhost:5000/review/${message}`);
    if (!req.ok) {
      return null
    }
    const res = await req.json();
    return res.response;
  } catch (err) {
    console.error(err);
    return null
  }
}

export default getEntryValue;
