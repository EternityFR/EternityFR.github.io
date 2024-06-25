const contents = {
    blackhole: '<div id="enterPanel"><button id="enterButton">ENTRER</button></div><script type="x-shader/x-vertex" id="vertexShader"> void main() { gl_Position = vec4( position, 1.0 );}</script>',
    main: '<nav class="navbar navbar-expand-lg navbar-dark fixed-top"><div class="container-fluid"><a class="navbar-brand"><img src="" alt="Eternity" widht="auto" height="50"></a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarNav"><ul class="navbar-nav ms-3"><li class="nav-item"><a class="nav-link active" href="#" data-content="welcome">Accueil</a></li><span class="navbar-separator">|</span><li class="nav-item"><a class="nav-link" href="#" data-content="contact">Contact</a></li></ul><ul class="navbar-nav ms-auto"><li class="nav-item"><a class="nav-link external-link" href="https://discord.gg/BHMDyeHPaH" target="_blank" rel="noopener noreferrer"><img src="discord.webp" alt="Eternity Discord" widht="auto" height="50"></a></li></ul></div></div></nav><main class="main-content container"></main><footer class="text-white text-center py-3"><div>Eternity &copy; 2024</div></footer><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script><script src="form.js"></script>',
    welcome: '<section id="welcome" class="my-5"><h2>Site en construction</h2></section>',
    contact: '<section id="contact" class="my-5"><h2>Contact</h2><p>Pour nous contacter</p><br /><form onsubmit="sendContact(event)"><div class="mb-3"><label class="form-label">Méthode de réponse</label><div><input type="radio" id="emailOption" name="contactMethod" value="email" checked onclick="toggleContactMethod()" /> Email<input type="radio" id="discordOption" name="contactMethod" value="discord" onclick="toggleContactMethod()" /> Discord</div></div><div class="mb-3"><label for="nicknameInput" class="form-label" id="nicknameLabel">Addresse email</label><input type="email" class="form-control" id="nicknameInput" placeholder="name@example.com" /></div><div class="mb-3"><label for="messageInput" class="form-label">Message</label><textarea class="form-control" id="messageInput" rows="3"></textarea></div><button type="submit" class="btn btn-primary">Envoyer</button></form></section>'
};


function loadContent(e) {
    const body = document.querySelector("body");
    const dynamicstyle = document.getElementById("dynamicstyle");

    if (e === "blackhole") {
        body.innerHTML = contents[e];
        attachEnterButtonListener();
        loadScript("index.js");
    } else if (e === "main") {
        body.innerHTML = contents[e];
        document.dispatchEvent(new Event('stopRender'));
        unloadScript("dynamicModuleScript");
        dynamicstyle.textContent = `
            body {
                background: url(milkyway.jpg) no-repeat center center fixed;
                background-size: cover;
                margin: 0;
                padding: 0;
                overflow-x: hidden;
            }
            
            body::before {
                content: "";
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .75);
                z-index: -1;
            }

            .main-content {
                padding-top: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            footer {
                position: fixed;
                height: 60px;
                bottom: 0;
                width: 100%;
                background: rgba(0, 0, 0, .5);
            }

            .dropdown-menu,
            .navbar {
                background: rgba(0, 0, 0, .5);
            }

            #contact {
                color: #fff;
                text-align: center;
                background: rgba(0, 0, 0, .5);
                border-radius: 8px;
                padding: 10px;
                margin: 10px 0;
            }

            #welcome {
                color: #fff;
                text-align: center;
            }

            .navbar-separator {
                padding-top: 7px;
                margin: 0 5px;
                color: #ffffff85;
            }
        `;
        attachNavLinkListeners();
        updateMainContent("welcome");
    }
}

function updateMainContent(content) {
    document.querySelector(".main-content").innerHTML = contents[content];
}

function attachEnterButtonListener() {
    const enterButton = document.getElementById("enterButton");
    if (enterButton) {
        enterButton.addEventListener("click", function (event) {
            enterButton.style.transition = 'opacity 0.5s ease-out';
            enterButton.style.opacity = '0';
            setTimeout(() => {
                loadContent("main");
                updateMainContent("welcome");
            }, 1000);
        });
    }
}

function attachNavLinkListeners() {
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelectorAll(".nav-link").forEach((e) => e.classList.remove("active"));
            link.classList.add("active");
            if (!link.classList.contains("dropdown-toggle")) {
                updateMainContent(link.getAttribute("data-content"));
            }
        });
    });
    document.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let content = item.getAttribute("data-content");
            updateMainContent(content);
        });
    });
}

function loadScript(src, type = "module") {
    const script = document.createElement("script");
    script.type = type;
    script.src = src;
    script.crossOrigin = "anonymous";
    script.id = "dynamicModuleScript";
    document.head.appendChild(script);
}

function unloadScript(id) {
    const script = document.getElementById(id);
    if (script) {
        script.remove();
    }
}
document.addEventListener("DOMContentLoaded", function() {
    loadInitialContent();
});

function loadInitialContent() {
    loadContent("blackhole");
}