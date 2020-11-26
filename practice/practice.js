// 데이터 초기화 or 불러오기
let localData = null;
if (localStorage.getItem('localData')) {
    localData = JSON.parse(localStorage.getItem('localData'));
} else {
    localData = [];
}

// 데이터를 카드로 생성
if (localData) {
    for (const cardItem of localData) {
        const newCard = document.createElement('div');
        newCard.classList.add('w-100', 'col-12', 'col-sm-6', 'col-lg-4', 'mb-5');
        newCard.setAttribute('id', `card${cardItem.id}`);
    
        const cardBase = document.createElement('div')
        cardBase.classList.add('card', 'px-0')
    
        const cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');
        cardImg.src = 'https://picsum.photos/200';
        cardImg.alt = 'card-img';
    
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'w-100');
    
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerHTML = `<h2>${cardItem.title}</h2>`;
    
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerHTML = cardItem.content;
    
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('w-100', 'd-flex', 'flex-column', 'align-items-center');
        
        const cardBtn = document.createElement('a')
        cardBtn.classList.add('btn', 'btn-outline-warning', 'btn-block');
        cardBtn.href = '#';
        cardBtn.innerHTML = 'Detail';
    
        // 카드 삭제 버튼
        const cardDeleteBtn = document.createElement('button')
        cardDeleteBtn.classList.add('btn', 'btn-outline-danger', 'btn-block');
        cardDeleteBtn.innerHTML = 'Delete';
        cardDeleteBtn.addEventListener('click', function() {
            const index = localData.findIndex(function(item) {return `card${item.id}` === newCard.id})
            if (index > -1) {
                localData.splice(index, 1)
                console.log(localData)
                localStorage.setItem("localData", JSON.stringify(localData))
            }
            const trash = document.querySelector(`#${newCard.id}`)
            trash.remove();
        });
        
        // 생성된 요소 결합
        cardFooter.append(cardBtn, cardDeleteBtn)
        cardBody.append(cardTitle, cardText, cardFooter);
        cardBase.append(cardImg, cardBody);
        newCard.append(cardBase);
    
        document.querySelector('#cardList').appendChild(newCard);
    }
}


// 엘리먼트 정의
const newCardBtn = document.querySelector('#newCardBtn');
const cardTitleInput = document.querySelector('#cardTitleForm');
const cardTextInput = document.querySelector('#cardTextForm');
const cardArea = document.querySelector('#cardList');

// 유효성 검증
let validCardTitle = false;
let validCardContent = false;
function isFormValid(title, content) {
    {title ? (validCardTitle = true) : (validCardTitle = false)};
    {content ? (validCardContent = true) : (validCardContent = false)};
};

// 새로운 카드 생성
let cardId = 0;
if (localData.length > 0) {
    cardId = localData[localData.length-1].id + 1;
}

function createNewCard(title, text) {
    // 데이터 생성
    let newCardData = {};
    newCardData.id = cardId
    newCardData.title = title;
    newCardData.content = text;

    const newCard = document.createElement('div');
    newCard.classList.add('w-100', 'col-12', 'col-sm-6', 'col-lg-4', 'mb-5');
    // 카드에 고유 id 부여
    newCard.setAttribute('id', `card${cardId}`);
    cardId ++;

    const cardBase = document.createElement('div')
    cardBase.classList.add('card', 'px-0')

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = 'https://picsum.photos/200';
    cardImg.alt = 'card-img';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'w-100');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = `<h2>${title}</h2>`;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerHTML = text;

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('w-100', 'd-flex', 'flex-column', 'align-items-center');
    
    const cardBtn = document.createElement('a')
    cardBtn.classList.add('btn', 'btn-outline-warning', 'btn-block');
    cardBtn.href = '#';
    cardBtn.innerHTML = 'Detail';

    // 카드 삭제 버튼
    const cardDeleteBtn = document.createElement('button')
    cardDeleteBtn.classList.add('btn', 'btn-outline-danger', 'btn-block');
    cardDeleteBtn.innerHTML = 'Delete';
    cardDeleteBtn.addEventListener('click', function() {
        
        const index = localData.findIndex(function(item) {return `card${item.id}` === newCard.id})
        console.log(index)
        if (index > -1) {
            localData.splice(index, 1)
            console.log(localData)
            localStorage.setItem("localData", JSON.stringify(localData))
        }
        const trash = document.querySelector(`#${newCard.id}`)
        trash.remove();
    });
    
    // 생성된 요소 결합
    cardFooter.append(cardBtn, cardDeleteBtn)
    cardBody.append(cardTitle, cardText, cardFooter);
    cardBase.append(cardImg, cardBody);
    newCard.append(cardBase);

    // 카드 데이터에 저장
    localData.push(newCardData);
    localStorage.setItem("localData", JSON.stringify(localData))

    return newCard;
}


// newCardBtn: 클릭 이벤트
newCardBtn.addEventListener('click', function() {
    // 유효성 검사
    isFormValid(cardTitleInput.value, cardTextInput.value);
    switch (validCardTitle && validCardContent) {
        // Pass
        case true:
            // 오류 메시지 초기화
            const titleWarning = document.querySelector('.title-warning');
            const textWarning = document.querySelector('.content-warning');
            {titleWarning ? (titleWarning.remove()) : (null)};
            {textWarning ? (textWarning.remove()) : (null)};
            // 카드 생성
            const card = createNewCard(cardTitleInput.value, cardTextInput.value);
            cardArea.appendChild(card);
            // 입력필드 초기화
            cardTitleInput.value = null;
            cardTextInput.value = null;
            // 첫 번째 입력 필드에 커서 위치
            cardTitleInput.focus();
            break;
        // Fail
        case false:
            // 제목 에러
            if (!validCardTitle) {
                if (!document.querySelector('.title-warning')) {
                    const warning = document.createElement('small');
                    warning.classList.add('form-text','text-danger', 'title-warning')
                    warning.innerText = 'No title!'
                    document.querySelector('#titleFormArea').append(warning);
                };
                document.querySelector('#cardTitleForm').focus();
            };
            // 내용 에러
            if (!validCardContent) {
                if (!document.querySelector('.content-warning')) {
                    const warning = document.createElement('small');
                    warning.classList.add('form-text','text-danger', 'content-warning')
                    warning.innerText = 'No content!';
                    document.querySelector('#textFormArea').append(warning);
                };
            };
            break;
    };
})

// cardTitleForm: 엔터키 이벤트
cardTitleInput.addEventListener('keyup', function(e) {
    if (e.code === 'Enter') {
        document.querySelector('#cardTextForm').focus()
    };
})

// cardTextForm: 엔터키 이벤트
cardTextInput.addEventListener('keyup', function(e) {
    if (e.code === 'Enter') {
        isFormValid(cardTitleInput.value, cardTextInput.value);
        switch (validCardTitle && validCardContent) {
            // Pass
            case true: 
                // 오류 메시지 초기화
                const titleWarning = document.querySelector('.title-warning');
                const textWarning = document.querySelector('.content-warning');
                {titleWarning ? (titleWarning.remove()) : (null)};
                {textWarning ? (textWarning.remove()) : (null)};
                // 카드 생성
                const card = createNewCard(cardTitleInput.value, cardTextInput.value);
                cardArea.appendChild(card);
                // 입력필드 초기화
                cardTitleInput.value = null;
                cardTextInput.value = null;
                // 첫 번째 입력 필드에 커서 위치
                cardTitleInput.focus();
                break;
            // Fail
            case false:
                // 제목 에러
                if (!validCardTitle) {
                    if (!document.querySelector('.title-warning')) {
                        const warning = document.createElement('small');
                        warning.classList.add('form-text','text-danger', 'title-warning');
                        warning.innerText = 'No title!';
                        document.querySelector('#titleFormArea').append(warning);
                    }
                    document.querySelector('#cardTitleForm').focus();
                };
                // 내용 에러
                if (!validCardContent) {
                    if (!document.querySelector('.content-warning')) {
                        const warning = document.createElement('small');
                        warning.classList.add('form-text','text-danger', 'content-warning');
                        warning.innerText = 'No content!';
                        document.querySelector('#textFormArea').append(warning);
                    }
                };
                break;
        };
    };
})
