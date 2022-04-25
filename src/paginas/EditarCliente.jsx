import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";
import Alerta from "../components/Alerta";
import Spinner from "../components/Spinner";

const EditarCliente = () => {
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(false);
	const { id } = useParams();
	useEffect(() => {
		setCargando(!cargando);
		const obtenerCliAPI = async () => {
			try {
				const url = `${import.meta.env.VITE_API_URL}/${id}`;
				const respuesta = await fetch(url);
				const resultado = await respuesta.json();
				setCliente(resultado);
			} catch (error) {
				console.log(error);
			}
			setCargando(false);
		};
		obtenerCliAPI();
	}, []);

	return (
		<>
			<h1 className="font-black text-blue-900 text-4xl">Editar Cliente</h1>
			<p className="mt-3">
				Utiliza este formulario para editar datos de un cliente.
			</p>
			{cargando ? (
				<Spinner />
			) : cliente?.nombre ? (
				<Formulario cliente={cliente} cargando={cargando} />
			) : (
				<Alerta>Cliente ID no válido</Alerta>
			)}
		</>
	);
};

export default EditarCliente;
