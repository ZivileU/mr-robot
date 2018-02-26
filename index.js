function createNode(el) {
    return document.createElement(el);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const root = document.getElementById('application-root');
const url = 'http://api.tvmaze.com/singlesearch/shows?q=mr-robot&embed=episodes';

fetch(url)
    .then((resp) => resp.json())
    .then((data) => {getTop(data); getEpisodes(data)})
    // .then((data) => getEpisodes(data))
    .catch(function(error) {
        console.log(error);
}); 

function getTop(data){
    let imgTop = createNode('img'),
        descriptionDiv = createNode('div'),
        name = createNode('h1'),
        genres = createNode('p'),
        rating = createNode('p'),
        description = createNode('p');

    imgTop.src = data.image.medium;
    name.innerHTML = data.name;
    genres.innerHTML = `<b>Genres:</b> ${data.genres.join(', ')}`;
    rating.innerHTML = `<b>Rating:</b> ${Math.round(data.rating.average)}/10`;
    description.innerHTML = data.summary;

    append(root, imgTop);
    append(root, descriptionDiv);
    append(descriptionDiv, name);
    append(descriptionDiv, genres);
    append(descriptionDiv, rating);
    append(descriptionDiv, description);

    console.log(data)
};

function getEpisodes(data) {
    let episodeList = data._embedded.episodes;
    console.log(episodeList);

    return episodeList.map(function(episode) {
        let episodeDiv = createNode('div'),
            episodeImg = createNode('img'),
            episodeCaption = createNode('p'),
            seasonNum = ("0" + episode.season).slice(-2),
            episodeNum = ("0" + episode.number).slice(-2);
        episodeImg.src = episode.image.medium;
        episodeCaption.innerHTML = `<b>S${seasonNum}E${episodeNum}</b> ${episode.name}`;
        append(root, episodeDiv);
        append(episodeDiv, episodeImg);
        append(episodeDiv, episodeCaption);
    })
};