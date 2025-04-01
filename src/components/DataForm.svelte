<script lang="ts">
    // https://docs.astro.build/es/reference/configuration-reference/#experimentalenv
    import { PRIVATE_FORM_URL } from "astro:env/client";

    let nombres = "";
    let email = "";
    let mensaje = "";
    let telefono = "";
    let enviado = false; // Variable para controlar si el formulario fue enviado

    let errors = {
        nombres: "",
        email: "",
        mensaje: "",
        telefono: "",
    };

    const validarFormulario = (): boolean => {
        let esValido = true;

        // Resetear errores
        errors = { nombres: "", email: "", mensaje: "", telefono: "" };

        // Validacipn del email
        if (!email) {
            errors.email = "Email is mandatory";
            esValido = false;
        } else if (
            !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
        ) {
            errors.email = "Email is not valid";
            esValido = false;
        }

        // Validacipn del nombre
        if (!nombres) {
            errors.nombres = "Name is mandatory";
            esValido = false;
        }

        // Validacipn: El telefono no puede estar vacío
        if (!telefono) {
            errors.telefono = "Phone is mandatory";
            esValido = false;
        }

        // Validacipn del mensaje not empty
        if (!mensaje.trim()) {
            // .trim() para asegurarse que no haya espacios en blanco
            errors.mensaje = "Message is mandatory";
            esValido = false;
        }

        // mssg < 10
        if (mensaje.length < 10) {
            errors.mensaje = "The message must be at least 10 characters long.";
            esValido = false;
        }

        return esValido;
    };

    const enviarFormulario = async (e: Event) => {
        e.preventDefault();

        if (validarFormulario()) {
            // Limpiar los campos y marcar como "enviado" antes de hacer la llamada
            const formData = {
                nombres,
                email,
                mensaje,
                telefono,
            };

            // Limpiar los campos antes de enviar el formulario
            nombres = "";
            email = "";
            mensaje = "";
            telefono = "";
            // Cambiar el estado de 'enviado' inmediatamente dessps de enviar
            enviado = true;

            try {
                console.log(formData);
                // Realizar la llamada fetch a la API

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify(formData);
                var requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                const response = await fetch(PRIVATE_FORM_URL, requestOptions);

                if (response.ok) {
                    const result = await response.text();
                    // console.log(result);
                }
                // else {
                //     console.log(
                //         "Error al enviar el formulario:",
                //         response.statusText,
                //     );
                // }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        }
    };
</script>

<form novalidate on:submit={enviarFormulario} class="h-[588px]">
    {#if enviado}
        <!-- Mostrar la tarjeta de "enviado" -->
        <div
            class="text-center p-6 text-[#f5f3ff] dark:bg-[#1f263b] rounded-lg h-full flex flex-col items-center justify-center"
        >
            <svg
                class="w-12 h-12 mx-auto mb-4 text-[#6f83bd]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
                Sent
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
                Thank you for your message. We've received your form and will be in touch soon.
            </p>
        </div>
    {:else}
        <div class="mb-4">
            <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                for="email">Email</label
            >
            <input
                type="email"
                id="email"
                bind:value={email}
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-[#8bdefa]"
                required
                placeholder="test@hotmail.com"
            />
            {#if errors.email}
                <p role="alert" class="!text-red-500 !text-sm mt-1">
                    {errors.email}
                </p>
            {/if}
        </div>

        <div class="mb-4">
            <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                for="nombres">Name</label
            >
            <input
                type="text"
                id="nombres"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-[#8bdefa]"
                bind:value={nombres}
                required
                placeholder="Juan Lopez"
            />
            {#if errors.nombres}
                <p role="alert" class="!text-red-500 !text-sm mt-1">
                    {errors.nombres}
                </p>
            {/if}
        </div>

        <div class="mb-4">
            <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                for="telefono">Phone</label
            >
            <input
                type="number"
                id="telefono"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-[#8bdefa]"
                bind:value={telefono}
                required
                placeholder="+51 994 434 434"
            />
            {#if errors.telefono}
                <p role="alert" class="!text-red-500 !text-sm mt-1">
                    {errors.telefono}
                </p>
            {/if}
        </div>

        <div class="mb-6">
            <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                for="mensaje">Message</label
            >
            <textarea
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-[#8bdefa]"
                id="mensaje"
                rows={5}
                bind:value={mensaje}
                required
                placeholder="Hi! Enter your message here..."
            ></textarea>
            {#if errors.mensaje}
                <p role="alert" class="!text-red-500 !text-sm mt-1">
                    {errors.mensaje}
                </p>
            {/if}
        </div>
        <button
            type="submit"
            class="w-full btn-primary"
            >Enviar</button
        >
    {/if}
</form>
