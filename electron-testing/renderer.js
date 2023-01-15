const information = document.getElementById('info')

information.innerText = `This app is using Chrome ${versions.chrome()}, NodeJS ${versions.node()}, and Electron ${versions.electron()}`