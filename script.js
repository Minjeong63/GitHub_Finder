import { Octokit, App } from 'https://esm.sh/octokit';

const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN,
});

// 엔터 눌렀을 때 입력된 사용자 정보 불러오는 함수 실행
const inputEl = document.getElementById('input');
inputEl.addEventListener('keydown', (event) => {
  if (
    event.key === 'Enter' &&
    inputEl.value != '' &&
    inputEl.value != localStorage.getItem('user')
  ) {
    localStorage.setItem('user', inputEl.value);
    location.reload();
    getUserData(inputEl.value);
  }
});

// username 입력 후 userData 받아오는 함수
const getUserData = async (user) => {
  let apiUrl = `Get /users/`;

  await octokit
    .request(apiUrl + user)
    .then(async ({ data }) => {
      const imgEl = document.getElementById('image');
      imgEl.src = data.avatar_url;

      const publicReposEl = document.getElementById('public-repos');
      publicReposEl.innerText = data.public_repos;

      const publicGists = document.getElementById('public-gists');
      publicGists.innerText = data.public_gists;

      const followers = document.getElementById('followers');
      followers.innerText = data.followers;

      const following = document.getElementById('following');
      following.innerText = data.following;

      const company = document.getElementById('company');
      company.innerText = data.company != null ? data.company : 'null';

      const blog = document.getElementById('blog');
      blog.innerText = data.blog != '' ? data.blog : 'null';

      const location = document.getElementById('location');
      location.innerText = data.location != null ? data.location : 'null';

      const createdAt = document.getElementById('created_at');
      createdAt.innerText = data.created_at;

      await clickViewFile(data.html_url);
      await getRepos(data.repos_url);
    })
    .catch((error) => {
      console.error('요청 실패!!!!', error);
    });
};

// 새로고침 했을 때 데이터가 유지되게 하기 위해 필요한 조건
if (localStorage.getItem('user') && inputEl.value == '') {
  getUserData(localStorage.getItem('user'));
}

// View Profile을 누르면 user의 profile로 이동하게 해주는 함수
const clickViewFile = async (url) => {
  const aEl = document.getElementById('view-file');
  aEl.href = url;
};

// repository 배열 가져오는 함수
const getRepos = async (url) => {
  console.log('url : ', url);
  await octokit
    .request(url)
    .then(async ({ data }) => {
      await createRepo(data);
    })
    .catch((err) => console.log(err));
};

// 받아온 repository 데이터들로 실제 요소들을 만들어주는 함수
const createRepo = async (data) => {
  for (let i = 0; i < data.length; i++) {
    const repos = document.getElementById('repos');
    const repoEl = document.createElement('div');
    repoEl.classList.add('repo');
    const pDivEl = document.createElement('div');
    pDivEl.classList.add('pDiv');
    const pEl = document.createElement('p');
    pEl.classList.add('p');
    pEl.innerText = data[i].name;
    pDivEl.appendChild(pEl);
    const buttonContainerDivEl = document.createElement('div');
    buttonContainerDivEl.classList.add('buttonContainer');
    const buttonDivEl1 = document.createElement('div');
    const buttonDivEl2 = document.createElement('div');
    const buttonDivEl3 = document.createElement('div');
    buttonDivEl1.classList.add('button1');
    buttonDivEl2.classList.add('button2');
    buttonDivEl3.classList.add('button3');
    buttonDivEl1.innerText = `Stars: ${data[i].stargazers_count}`;
    buttonDivEl2.innerText = `Watchers: ${data[i].watchers_count}`;
    buttonDivEl3.innerText = `Forks: ${data[i].forks_count}`;
    buttonContainerDivEl.appendChild(buttonDivEl1);
    buttonContainerDivEl.appendChild(buttonDivEl2);
    buttonContainerDivEl.appendChild(buttonDivEl3);
    repoEl.appendChild(pDivEl);
    repoEl.appendChild(buttonContainerDivEl);
    repos.append(repoEl);
  }
};
