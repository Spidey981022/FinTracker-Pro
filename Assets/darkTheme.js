// DARK MODE TOGGLE EVENT
export default function initDarkTheme()
{
    const darkToggle = document.getElementById("goDark");
    const body = document.body;

    darkToggle.addEventListener("change", () => {
        body.classList.toggle("dark");
    });
}