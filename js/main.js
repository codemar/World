document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    document.body.style.margin = '0px'; // remove margin
    
    const sb = new Sidebar();
    const world = new World();
    const hb = new HeroBuilder();
    let myHero;

    const createfun = function() {
        myHero = new Hero({x: 5, y: 5}, hb.character);
        world.addHero(myHero);
        
        hb.heroCanvas.removeEventListener("click", createfun);
        hb.hide();
    };
    
    hb.doneCanvas.addEventListener("click", createfun);
}
