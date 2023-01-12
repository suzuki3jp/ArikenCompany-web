const classNames = {
    header: {
        githubLogo: "github-logo"
    }
}

const GITHUB_ARIKEN_COMPANY_URL = "https://github.com/arikencompany"

const github = document.getElementsByClassName(classNames.header.githubLogo)[0];
github.addEventListener("click", () => window.open(GITHUB_ARIKEN_COMPANY_URL, "_blank"))