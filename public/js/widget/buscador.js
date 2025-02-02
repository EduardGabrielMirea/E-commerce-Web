$(function() {
    let productos = [];

    $.when(
        $.getJSON("../../public/data/herramientas.json"),
        $.getJSON("../../public/data/materiales.json")
    ).done(function(herramientas, materiales) {
        productos = herramientas[0].concat(materiales[0]);

        $("#buscador").autocomplete({
            source: function(request, response) {
                const resultados = productos.filter(item =>
                    item.nombre.toLowerCase().includes(request.term.toLowerCase())
                );
                response(resultados);
            },
            minLength: 1,
            select: function(event, ui) {
                const { nombre, precio, imagen } = ui.item;
                const fila = `
                    <tr>
                        <td>${nombre}</td>
                        <td><img src="${imagen}" alt="${nombre}" class="img-fluid" style="max-height: 50px;"></td>
                        <td>1</td>
                        <td>${precio}</td>
                        <td><button class="btn btn-danger btn-sm quitar" data-nombre="${nombre}">Quitar</button></td>
                    </tr>
                `;
                $("#cesta").append(fila);
                $(this).val('');

                $("#cesta").on("click", ".quitar", function() {
                    $(this).closest("tr").remove();
                });

                return false;
            }
        }).autocomplete("instance")._renderItem = function(ul, item) {
            return $("<li>")
                .append(`<div><img src="${item.imagen}" alt="${item.nombre}" class="img-thumbnail me-2" style="width: 50px;">${item.nombre} - <strong>${item.precio}</strong></div>`)
                .appendTo(ul);
        };
    });
});
