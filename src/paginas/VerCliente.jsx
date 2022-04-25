import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/Spinner.css";

const VerCliente = () => {
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

	return cargando ? (
		<Spinner />
	) : Object.keys(cliente).length === 0 ? (
		<p>No hay resultados</p>
	) : (
		<div>
			<h1 className="font-black text-blue-900 text-4xl">
				Ver Cliente: {cliente.nombre}
			</h1>
			<p className="mt-3">Informacion del cliente.</p>

			{cliente.nombre && (
				<p className="text-2xl text-gray-600 mt-5">
					<span className="text-gray-800 uppercase font-bold">Cliente: </span>
					{cliente.nombre}
				</p>
			)}
			{cliente.email && (
				<p className="text-2xl text-gray-600">
					<span className="text-gray-800 uppercase font-bold">Email: </span>
					{cliente.email}
				</p>
			)}
			{cliente.telefono && (
				<p className="text-2xl text-gray-600">
					<span className="text-gray-800 uppercase font-bold">telefono: </span>
					{cliente.telefono}
				</p>
			)}
			{cliente.empresa && (
				<p className="text-2xl text-gray-600">
					<span className="text-gray-800 uppercase font-bold">Empresa: </span>
					{cliente.empresa}
				</p>
			)}
			{cliente.notas && (
				<p className="text-2xl text-gray-600">
					<span className="text-gray-800 uppercase font-bold">Notas: </span>
					{cliente.notas}
				</p>
			)}
		</div>
	);
};

export default VerCliente;
