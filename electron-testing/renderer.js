const information = document.getElementById('info')

information.innerText = `This app is using Chrome ${versions.chrome()}, NodeJS ${versions.node()}, and Electron ${versions.electron()}`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response)
}

func()