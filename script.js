 const news = document.getElementById("news");
 const heroHigh = document.getElementById("heroHigh");
 const heroMessages = ["Perform.", "Run.", "Handle."];
    let heroIndex = 0;

 function heroUpdate(){
 
 setInterval(() => { 
        heroIndex = (heroIndex + 1) % heroMessages.length;


    heroHigh.textContent = `${heroMessages[heroIndex]}`;
    
 }, 2000);

 }
function newsHide(){
    news.style.display = "none";
}

heroUpdate();

window.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navCon = document.getElementById("navCon");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    navCon.style.backdropFilter = "blur(32px)";
    
  });
});
window.addEventListener("DOMContentLoaded", () => {
          const markerData = [
            { name: 'USA', lat: 39.0438, lng: -77.4874, color: '#3b82f6', ping: '120ms' },
            { name: 'Germany', lat: 50.1109, lng: 8.6821, color: '#3b82f6', ping: '85ms' },
            { name: 'India', lat: 19.0760, lng: 72.8777, color: '#10b981', ping: '40ms' },
            { name: 'Vietnam', lat: 10.8231, lng: 106.6297, color: '#10b981', ping: '25ms' },
            { name: 'Philippines', lat: 14.5995, lng: 120.9842, color: '#10b981', ping: '35ms' }
        ];

        const arcsData = [];
        markerData.forEach((start, i) => {
            markerData.slice(i + 1).forEach(end => {
                arcsData.push({
                    startLat: start.lat,
                    startLng: start.lng,
                    endLat: end.lat,
                    endLng: end.lng,
                    color: ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.6)']
                });
            });
        });

        const elem = document.getElementById('globeViz');
        setTimeout(() => {})
        const  world = new Globe(elem)
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
            .backgroundColor('rgba(0,0,0,0)')
            .showAtmosphere(true)
            .atmosphereColor('#3b82f6')
            .width(elem.offsetWidth)
            .height(elem.offsetHeight)

            .pointsData(markerData)
            .pointsMerge(false)
            .pointRadius(0.6)
            .pointColor('color')
            .pointAltitude(0.01)
            .pointResolution(32)
            .pointLabel(d => `
                <div style="background: rgba(15, 15, 20, 0.9); backdrop-filter: blur(10px); padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5); color: white; font-family: 'Poppins', sans-serif; pointer-events: none; min-width: 140px;">
                    <div style="font-weight: 600; font-size: 15px; margin-bottom: 6px; letter-spacing: 0.3px;">${d.name} Nodes</div>
                    <div style="font-size: 13px; color: #94a3b8; display: flex; align-items: center; gap: 8px;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${parseInt(d.ping) < 50 ? '#10b981' : '#3b82f6'}; box-shadow: 0 0 8px ${parseInt(d.ping) < 50 ? '#10b981' : '#3b82f6'};"></div>
                        <span>Latency: <span style="color: white; font-weight: 600; margin-left: 2px;">${d.ping}</span></span>
                    </div>
                </div>
            `)
            .lineHoverPrecision(0.005)

            .arcsData(arcsData)
            .arcColor('color')
            .arcDashLength(0.4)
            .arcDashGap(4)
            .arcDashAnimateTime(1500)
            .arcStroke(0.2)
            .arcAltitude(0.05)

            .pointOfView({ lat: 20, lng: 40, altitude: 1.8 });

        function setupGlobeControls() {
            const controls = world.controls();
            if (controls) {
                controls.enableZoom = false;
                controls.enablePan = true;
                controls.enableRotate = true;
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.3;
            }

            const canvas = world.renderer() && world.renderer().domElement;
            const blockWheel = event => {
                if (event.target instanceof Element && event.target.closest('#globeViz')) {
                    event.preventDefault();
                }
            };

            window.addEventListener('wheel', blockWheel, { passive: false });
            if (canvas) {
                canvas.style.touchAction = 'none';
            }
            elem.style.touchAction = 'none';

            let globeLng = 40;
            const rotateSpeed = 0.03;
            const animateGlobe = () => {
                globeLng = (globeLng + rotateSpeed) % 360;
                world.pointOfView({ lat: 20, lng: globeLng, altitude: 2.3 }, 0);
                requestAnimationFrame(animateGlobe);
            };
            animateGlobe();
        }

        world.onGlobeReady(setupGlobeControls);

        window.addEventListener('resize', () => {
            world.width(elem.offsetWidth);
            world.height(elem.offsetHeight);
        });
})

