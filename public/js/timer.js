document.addEventListener('DOMContentLoaded', function () {
    const days = document.getElementById('timerdays')
    const hours = document.getElementById('timerhours')
    const minutes = document.getElementById('timerminutes')
    const seconds = document.getElementById('timerseconds')

    function timer() {
        let date = new Date(2021, 1, 17, 0, 0, 0, 0).getTime()
        let dateNow = new Date().getTime()
        let del  = (date - dateNow ) / 1000

        let rdays = parseInt(del  / 86400)
        rdays = intPlus(rdays)
        del = (del % 86400)

        let rhours = parseInt(del  / 3600)
        rhours = intPlus(rhours)
        del = (del % 3600)

        let rminutes = parseInt(del  / 60)
        rminutes = intPlus(rminutes)
        del = (del % 60)

        let rseconds = parseInt(del)
        rseconds = intPlus(rseconds)

        function intPlus(n) {
            if (n < 10 && n >= 0) return '0' + n
            return n
        }
        days.innerText = rdays
        hours.innerText = rhours
        minutes.innerText = rminutes
        seconds.innerText = rseconds
    }

    setInterval(timer, 1000)


    let btn = document.getElementById('mes')
    btn.addEventListener('click', async function () {
        let email = document.getElementById('email')
        let textarea = document.getElementsByClassName('textarea')[0]

        if(email.value !== '' && textarea.value !== '') {
            let response = await fetch('/newmasseg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email: email.value,
                    text: textarea.value
                })
            });

            if (response.status === 200) {
                let popup = document.getElementsByClassName('popup-wrapper')[0]
                popup.classList.add('popup-show')

                setInterval(function () {
                    popup.classList.remove('popup-show')
                }, 3000)
                email.value = ''
                textarea.value = ''
            }
        }
    })
});



/*





 */