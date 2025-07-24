document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const recordsContainer = document.createElement('div');
  recordsContainer.id = 'records';
  form.parentNode.appendChild(recordsContainer);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/records');
      const result = await response.json();

      if (result.success) {
        recordsContainer.innerHTML = '<h2>Registros Guardados</h2>';
        result.data.forEach((record, index) => {
          recordsContainer.innerHTML += `
            <div>
              <p><strong>#${index + 1}</strong></p>
              <p><strong>Título:</strong> ${record.title}</p>
              <p><strong>Descripción:</strong> ${record.description}</p>
              <p><strong>Año:</strong> ${record.year}</p>
              <p><strong>Archivo:</strong> ${
                record.file
                  ? `<img src="/uploads/${record.file.path.split('/').pop()}" alt="${record.file.originalName}" style="max-width: 200px; max-height: 200px;">`
                  : 'No se subió archivo'
              }</p>
              <hr>
            </div>
          `;
        });
      } else {
        recordsContainer.innerHTML = '<p>Error al obtener los registros.</p>';
      }
    } catch (error) {
      recordsContainer.innerHTML = `<p>Error en la solicitud: ${error.message}</p>`;
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert(`
          Registro Guardado:
          - Título: ${result.data.title}
          - Descripción: ${result.data.description}
          - Año: ${result.data.year}
          - Archivo: ${result.data.file ? result.data.file.originalName : 'No se subió archivo'}
        `);
        await fetchRecords(); // Actualiza los registros después de guardar
      } else {
        alert('Error al guardar el registro.');
      }
    } catch (error) {
      alert(`Error en la solicitud: ${error.message}`);
    }
  });

  // Cargar registros al cargar la página
  fetchRecords();
});
