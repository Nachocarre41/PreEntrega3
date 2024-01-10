document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos');
    const carritoContainer = document.getElementById('lista-carrito');
    const totalContainer = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    // Obtener productos del Local Storage o inicializar un array vacío
    const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Mostrar productos en el carrito
    function renderizarCarrito() {
        carritoContainer.innerHTML = '';
        let total = 0;

        productosEnCarrito.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `${producto.nombre} - Precio: $${producto.precio}`;
            carritoContainer.appendChild(li);
            total += producto.precio;
        });

        totalContainer.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Manejar clic en el botón "Agregar al carrito"
    productosContainer.addEventListener('click', e => {
        if (e.target.classList.contains('agregar')) {
            const productoSeleccionado = e.target.parentElement;
            const nuevoProducto = {
                id: productoSeleccionado.dataset.id,
                nombre: productoSeleccionado.dataset.nombre,
                precio: parseFloat(productoSeleccionado.dataset.precio)
            };

            // Agregar producto al array del carrito
            productosEnCarrito.push(nuevoProducto);

            // Actualizar Local Storage
            localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

            // Actualizar la interfaz
            renderizarCarrito();
        }
    });

    // Manejar clic en el botón "Vaciar Carrito"
    vaciarCarritoBtn.addEventListener('click', () => {
        // Vaciar array del carrito
        productosEnCarrito.length = 0;

        // Actualizar Local Storage
        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

        // Actualizar la interfaz
        renderizarCarrito();
    });

    // Mostrar productos en el carrito al cargar la página
    renderizarCarrito();
});
