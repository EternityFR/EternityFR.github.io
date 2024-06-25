function toggleContactMethod() {
    let e = document.getElementById("nicknameInput"),
        t = document.getElementById("nicknameLabel"),
        a = document.getElementById("emailOption").checked;
    a ? ((t.textContent = "Adresse email"), (e.type = "email"), (e.placeholder = "name@example.com")) : ((t.textContent = "Pseudo Discord"), (e.type = "text"), (e.placeholder = "pseudo"));
}
async function sendContact(e) {
    e.preventDefault();
    let t = document.getElementById("emailOption").checked,
        a = document.getElementById("nicknameInput").value,
        n = document.getElementById("messageInput").value;
    try {
        (
            await fetch("https://discord.com/api/webhooks/1249376084793884692/WKDZZI1CmL_1hgFTdunP0U23m00GItGfOHoIUaHU8pNf_CnLtgczEgaIhX5p0Bw54Rjr", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    embeds: [
                        {
                            title: "Contact de EternityFR",
                            fields: [
                                { name: "À", value: "<@835120160368623647>" },
                                { name: "Méthode de contact", value: t ? "Email" : "Discord" },
                                { name: "Expediteur", value: a },
                                { name: "Message", value: n },
                            ],
                        },
                    ],
                }),
            })
        ).ok
            ? (alert("Message envoyé!"), window.location.reload())
            : alert("Une erreur est survenue! Essayez plus tard!");
    } catch (l) {
        alert("Une erreur est survenue! Essayez plus tard!");
    }
}
