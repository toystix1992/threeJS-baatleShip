const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    render();
}

export default animate;
