import "./PrivateNavBar.css";

function PrivateNavBar() {
    return (
        <>
            <nav id="navMenuPrivado">
                <ul>
                    <li>
                        <span>Servicios</span>
                        <img src="/src/assets/icons/flechaDesplegablePaint.png" alt="v" />
                        <ul>
                            <li><a href="#PRIV_evolucionInflacionPorProducto">Inflalyzer</a></li>
                            <li><a href="#priv_categorizer">Categorizer</a></li>
                            <li><a href="#">Intervalizer</a></li>
                        </ul>
                    </li>
                    <li><span><a href="tickets.html">Mis tickets</a></span></li>
                    <li><span><a href="datos.html">Mis datos</a></span></li>
                    <li><span><a href="/contact.html">Contacto</a></span></li>
                </ul>
            </nav>
        </>
    );
}

export default PrivateNavBar;