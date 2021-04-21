const API_KEY = 'AIzaSyDeYXNJwr3BIBzMf956g-sRvIgK9OkUDvI';
const CLIENT_ID = '144449249725-r7ro322nk1o2i0tsjuihpm1dbq8bmmu8.apps.googleusercontent.com';
const gloAcademyList = document.querySelector('.glo-academy-list');
const trendingList = document.querySelector('.trending-list');
const musicList = document.querySelector('.music-list');


const createCard = (dataVideo) => {
    const imgUrl = dataVideo.snippet.thumbnails.high.url;
    const videoId = dataVideo.id.videoId
    const titleVideo = dataVideo.snippet.title
    const dateVideo = dataVideo.snippet.publishedAt
    const channelTitle = dataVideo.snippet.channelTitle
    const card = document.createElement('div');

    card.classList.add('video-card')
    card.innerHTML = `
            <div class="video-thumb">
              <a class="link-video youtube-modal" href="https://www.youtube.com/watch?v=${videoId}">
                <img src="${imgUrl}" alt="" class="thumbnail">
              </a>
            </div>
            <h3 class="video-title">${titleVideo}</h3>
            <div class="video-info">
              <span class="video-counter">
                <span class="video-date">${dateVideo}</span>
              </span>
              <span class="video-channel">${channelTitle}</span>
            </div>
    `;
    return card
}
const createList = (wrapper, listVideo) => {
    wrapper.textContent = ''; // лучше чем inner (так как дешевле)
    /*    for (let i = 0; i < listVideo.length; i++) { // for дешевле чем for Each()
            wrapper.textContent += listVideo[i]; // зачем тут + а все понял чтобы добавлялось а не перезаписывалось
        }*/
    listVideo.forEach((item) => {
            const card = createCard(item)
            wrapper.append(card)
        }); // можно убрать скобки вокруг item так как он один аргумент и можно убрать фигурные скобки

};
createList(gloAcademyList, gloAcademy)
createList(trendingList, trending)
createList(musicList, music)