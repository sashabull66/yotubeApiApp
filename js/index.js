const API_KEY = 'AIzaSyDeYXNJwr3BIBzMf956g-sRvIgK9OkUDvI';
const CLIENT_ID = '144449249725-r7ro322nk1o2i0tsjuihpm1dbq8bmmu8.apps.googleusercontent.com';
const gloAcademyList = document.querySelector('.glo-academy-list');
const trendingList = document.querySelector('.trending-list');
const musicList = document.querySelector('.music-list');

const createCard = (dataVideo) => {
    const imgUrl = dataVideo.snippet.thumbnails.high.url;
    const videoId = typeof dataVideo.id === 'string' ? dataVideo.id : dataVideo.id.videoId
    const titleVideo = dataVideo.snippet.title
    const viewCount = dataVideo.statistics?.viewCount
    const dateVideo = dataVideo.snippet.publishedAt
    const channelTitle = dataVideo.snippet.channelTitle
    const card = document.createElement('div'); // создаю элемент-div

    card.classList.add('video-card') // добавляю класс созданному div
    // вставить теги с переменными в созданный выше div
    card.innerHTML = `
            <div class="video-thumb">
              <a class="link-video youtube-modal" href="https://www.youtube.com/watch?v=${videoId}">
                <img src="${imgUrl}" alt="" class="thumbnail">
              </a>
            </div>
            <h3 class="video-title">${titleVideo}</h3>
            <div class="video-info">
                <span class="video-counter">
                ${viewCount ? `<span class="video-views">${viewCount}</span>`:''}
                <span class="video-date">${dateVideo}</span>
              </span>
              <span class="video-channel">${channelTitle}</span>
            </div>
    `;
    return card // вернуть функцией выше созданный элемент
}
const createList = (wrapper, listVideo) => { // аргументы: 1 оболочка блока с видео, 2 коллекция (массив) с кучей говна откуда вышеуказанная функция будет выковыривать нужное
    wrapper.textContent = ''; // очистить оболочку от контента
    listVideo.forEach((item) => { // для всех элементов массива с кучей г..а...
        const card = createCard(item) // переменная для каждого элемента массива прогоняющая этот элемент массива через функцию выше
        wrapper.append(card) // добавить созданный элемент в конец оболочки блока с видео
    });

};
createList(gloAcademyList, gloAcademy)
createList(trendingList, trending)
createList(musicList, music)

// youtube API

const authBtn = document.querySelector('.auth-btn')
const userAvatar = document.querySelector('.user-avatar')

const handleSuccessAuth = (data) => {
    authBtn.classList.add('hide');
    userAvatar.classList.remove('hide');
    userAvatar.src = '';
    userAvatar.alt = '';
}

const handleNoAuth = () => {
    authBtn.classList.remove('hide')
    userAvatar.classList.add('hide')
    userAvatar.src = '';
    userAvatar.alt = '';
}

const handleAuth = () => {
    gapi.auth2.getAuthInstance().signIn()
}

const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut()
}

const updateStatusAuth =  (data) => {
    data.isSignedIn.listen(() => {
        updateStatusAuth();
    })
    if (data.isSignedIn.get()) {
        const userData = data.currentUser.get().getBasicProfile();
        handleSuccessAuth(userData)
    }
    else {
        handleNoAuth()
    }
}

function initClient() {
    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/youtube.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(() => {
        updateStatusAuth(gapi.auth2.getAuthInstance())
        authBtn.addEventListener('click', handleAuth);
        userAvatar.addEventListener('click', handleSignOut);
    }).catch(() => {
        authBtn.removeEventListener('click', handleAuth);
        userAvatar.removeEventListener('click', handleSignOut);
        alert('Авторизация не возможна!')
    })
}

gapi.load('client:auth2', initClient);