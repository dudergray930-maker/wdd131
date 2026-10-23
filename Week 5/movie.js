function movieTemplate(movie) {
    return `<article class="movie">
    <h2>${movie.title}</h2>
    <img
        src="${movie.imgSrc}"
        alt="${movie.imgAlt}"
        />
        <p><strong>Release Date:</strong> ${movie.date}</p>
        <p><strong>Recommended Age:</strong> ${movie.age}</p>
    </article>`};