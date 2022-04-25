import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "../components/Spinner";
import "../styles/Spinner.css";

const Formulario = ({ cliente, cargando }) => {
	const navigate = useNavigate();

	const newClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.min(3, "El nombre es muy corto.")
			.max(20, "El nombre es muy largo")
			.required("El nombre del cliente es obligatorio."),
		empresa: Yup.string().required("El nombre de la empresa es obligatorio."),
		email: Yup.string()
			.email("Email no válido")
			.required("El email es obligatorio."),
		telefono: Yup.number()
			.positive("Número no valido")
			.integer("Número no valido")
			.typeError("El número no es valido"),
		// notas: "",
	});

	const handleSubmit = async (val) => {
		try {
			let respuesta;
			if (cliente.id) {
				const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;

				respuesta = await fetch(url, {
					method: "PUT",
					body: JSON.stringify(val),
					headers: {
						"Content-Type": "application/json",
					},
				});
			} else {
				const url = import.meta.env.VITE_API_URL;

				respuesta = await fetch(url, {
					method: "POST",
					body: JSON.stringify(val),
					headers: {
						"Content-Type": "application/json",
					},
				});
			}
			const resultado = await respuesta.json();
			console.log(resultado);
			navigate("/clientes");
		} catch (error) {
			console.log(error);
		}
	};

	return cargando ? (
		<Spinner />
	) : (
		<div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
			<h1 className="text-gray-600 font-bold text-xl uppercase text-center">
				{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
			</h1>

			<Formik
				initialValues={{
					nombre: cliente?.nombre ?? "",
					empresa: cliente?.empresa ?? "",
					email: cliente?.email ?? "",
					telefono: cliente?.telefono ?? "",
					notas: cliente?.notas ?? "",
				}}
				//enableReinitialize = esta variable es muy importante al momento de llena initialValues y al momento de hacer la edicion de datos
				enableReinitialize={true}
				onSubmit={async (val, { resetForm }) => {
					await handleSubmit(val);
					resetForm();
				}}
				validationSchema={newClienteSchema}
			>
				{({ errors, touched }) => {
					return (
						<Form className="mt-10 ">
							<div className="mb-4">
								<label htmlFor="nombre" className="text-gray-600 font-bold">
									Nombre:
								</label>
								<Field
									id="nombre"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-50"
									placeholder="Nombre del Cliente"
									name="nombre"
								/>
								{errors.nombre && touched.nombre ? (
									<Alerta>{errors.nombre}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="empresa" className="text-gray-600 font-bold">
									Empresa:
								</label>
								<Field
									id="empresa"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-50"
									placeholder="Empresa del Cliente"
									name="empresa"
								/>
								{errors.empresa && touched.empresa ? (
									<Alerta>{errors.empresa}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="email" className="text-gray-600 font-bold">
									Email:
								</label>
								<Field
									id="email"
									type="email"
									className="mt-2 block w-full p-3 bg-gray-50"
									placeholder="Email del Cliente"
									name="email"
								/>

								{errors.email && touched.email ? (
									<Alerta>{errors.email}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="telefono" className="text-gray-600 font-bold">
									Telefono:
								</label>
								<Field
									id="telefono"
									type="tel"
									className="mt-2 block w-full p-3 bg-gray-50"
									placeholder="Telefono del Cliente"
									name="telefono"
								/>
								{errors.telefono && touched.telefono ? (
									<Alerta>{errors.telefono}</Alerta>
								) : null}
							</div>
							<div className="mb-4">
								<label htmlFor="notas" className="text-gray-600 font-bold">
									Notas:
								</label>
								<Field
									as="textarea"
									id="notas"
									type="text"
									className="mt-2 block w-full p-3 bg-gray-50 h-40"
									placeholder="Notas del Cliente"
									name="notas"
								/>
							</div>

							<input
								className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
								type="submit"
								value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
							/>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

Formulario.defaultProps = {
	cliente: {},
	cargando: false,
};

export default Formulario;
