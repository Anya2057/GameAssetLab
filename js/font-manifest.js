const FONT_CATEGORIES={
 'Sans Serif':['Inter','Roboto','Open Sans','Lato','Montserrat','Poppins','Nunito','Raleway','Work Sans','Rubik'],
 'Serif':['Merriweather','Playfair Display','Lora','Bitter','Cormorant Garamond','Libre Baskerville','Crimson Text','DM Serif Display','Spectral','Bodoni Moda'],
 'Display':['Bebas Neue','Oswald','Anton','Archivo Black','Abril Fatface','Righteous','Bungee','Black Ops One','Fjalla One','Alfa Slab One'],
 'Handwriting':['Dancing Script','Pacifico','Caveat','Satisfy','Great Vibes','Sacramento','Kalam','Patrick Hand','Permanent Marker','Shadows Into Light'],
 'Monospace':['Roboto Mono','Space Mono','JetBrains Mono','IBM Plex Mono','Ubuntu Mono','Source Code Pro','Inconsolata','Fira Code','Courier Prime','DM Mono'],
 'Retro':['Monoton','Fascinate','Limelight','Bowlby One SC','Faster One','Codystar','Train One','Chango','Shrikhand','Ultra'],
 'Pixel / Arcade':['Press Start 2P','Silkscreen','Pixelify Sans','VT323','DotGothic16','Share Tech Mono','Quantico','Audiowide','Geo','Nova Square'],
 'Fantasy':['Cinzel','Cinzel Decorative','Uncial Antiqua','MedievalSharp','Metamorphous','Pirata One','Almendra','Grenze Gotisch','Eagle Lake','Fondamento'],
 'Elegant':['Italiana','Prata','Marcellus','Forum','Bellefair','Poiret One','Tenor Sans','Josefin Sans','Cormorant','Gilda Display'],
 'Cute / Playful':['Fredoka','Baloo 2','Chewy','Bubblegum Sans','Sniglet','Coiny','Cherry Bomb One','Luckiest Guy','Mochiy Pop One','DynaPuff'],
 'Horror / Dramatic':['Creepster','Nosifer','Butcherman','Eater','Metal Mania','New Rocker','UnifrakturCook','Pirata One','Rubik Wet Paint','Jolly Lodger'],
 'Sci-Fi / Tech':['Orbitron','Oxanium','Rajdhani','Exo 2','Michroma','Syncopate','Aldrich','Electrolize','Bruno Ace','Zen Dots']
};
const FONT_MANIFEST=Object.entries(FONT_CATEGORIES).flatMap(([category,names])=>names.map(name=>({name,category,weights:category==='Pixel / Arcade'||category==='Handwriting'?[400]:[300,400,500,600,700,800,900]})));
const SYSTEM_FONTS=[{name:'Arial',category:'System',weights:[400,700]},{name:'Georgia',category:'System',weights:[400,700]},{name:'Verdana',category:'System',weights:[400,700]}];
