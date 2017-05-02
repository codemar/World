document.addEventListener("DOMContentLoaded", initialize);

let myHero;
// let world;
let sidebar;
let heroBuilder;
let client;

function initialize() {
    document.body.style.margin = '0px'; // remove margin
    
    sidebar = new Sidebar();
    // world = new World();
    heroBuilder = new HeroBuilder();
    client = new Client("ws://localhost:2794/");
    
    const createfun = function() {
        myHero = new Hero({x: 5, y: 5}, heroBuilder.character);
        // world.addHero(myHero);

        client.connect();
        client.setHeroPixels(myHero.blocks, myHero.width, myHero.height);

        enableMovement();
        
        heroBuilder.heroCanvas.removeEventListener("click", createfun);
        heroBuilder.hide();
    };
    
    heroBuilder.doneCanvas.addEventListener("click", createfun);
}
