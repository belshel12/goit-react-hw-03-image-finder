const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32980017-bfe9b13623cd5fda61d70a35c';

const getApi = async (searchValue, page) => {
  const response = await fetch(
		`${BASE_URL}?key=${API_KEY}&q=${searchValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
	);
	if (!response.ok) {
		throw 'Oops, something went wrong';
	}
	return await response.json();
};

export {getApi};
