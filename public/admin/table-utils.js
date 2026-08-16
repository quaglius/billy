// Buscador + orden + paginado genérico para tablas del admin.
// Uso: envolver la tabla en [data-table-wrap], agregar [data-table-search] al input
// de búsqueda, [data-pager] al contenedor de paginado, data-sort="text|num" en los <th>
// que se puedan ordenar, y data-page-size en la <table data-admin-table>.
(function () {
  function setup(table) {
    const pageSize = Number(table.dataset.pageSize || 20);
    const tbody = table.tBodies[0];
    if (!tbody) return;

    const rows = Array.from(tbody.rows);
    let filtered = rows;
    let page = 1;
    let sortCol = -1;
    let sortDir = 1;

    const wrap = table.closest('[data-table-wrap]') || table.parentElement;
    const searchInput = wrap ? wrap.querySelector('[data-table-search]') : null;
    const pager = wrap ? wrap.querySelector('[data-pager]') : null;
    const countEl = wrap ? wrap.querySelector('[data-table-count]') : null;

    function render() {
      const start = (page - 1) * pageSize;
      const pageRows = filtered.slice(start, start + pageSize);
      const visible = new Set(pageRows);
      rows.forEach((r) => {
        r.hidden = !visible.has(r);
      });

      if (countEl) {
        countEl.textContent = filtered.length === rows.length
          ? `${rows.length} en total`
          : `${filtered.length} de ${rows.length}`;
      }

      if (pager) {
        pager.innerHTML = '';
        const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (totalPages > 1) {
          const info = document.createElement('span');
          info.className = 'admin-pager__info';
          info.textContent = filtered.length
            ? `Página ${page} de ${totalPages}`
            : 'Sin resultados';

          const prev = document.createElement('button');
          prev.type = 'button';
          prev.textContent = '← Anterior';
          prev.disabled = page <= 1;
          prev.addEventListener('click', () => {
            page -= 1;
            render();
          });

          const next = document.createElement('button');
          next.type = 'button';
          next.textContent = 'Siguiente →';
          next.disabled = page >= totalPages;
          next.addEventListener('click', () => {
            page += 1;
            render();
          });

          pager.append(prev, info, next);
        }
      }
    }

    function applyFilter() {
      const q = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();
      filtered = q ? rows.filter((r) => r.textContent.toLowerCase().includes(q)) : rows;
      page = 1;
      render();
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilter);
    }

    const headRow = table.tHead && table.tHead.rows[0];
    if (headRow) {
      Array.from(headRow.cells).forEach((th, colIndex) => {
        if (!th.dataset.sort) return;
        th.classList.add('is-sortable');
        th.setAttribute('role', 'button');
        th.tabIndex = 0;

        const activar = () => {
          if (sortCol === colIndex) sortDir *= -1;
          else {
            sortCol = colIndex;
            sortDir = 1;
          }
          const tipo = th.dataset.sort;
          rows.sort((a, b) => {
            const av = (a.cells[colIndex] && (a.cells[colIndex].dataset.value ?? a.cells[colIndex].textContent)) || '';
            const bv = (b.cells[colIndex] && (b.cells[colIndex].dataset.value ?? b.cells[colIndex].textContent)) || '';
            const cmp = tipo === 'num'
              ? Number(av) - Number(bv)
              : String(av).trim().localeCompare(String(bv).trim(), 'es');
            return cmp * sortDir;
          });
          rows.forEach((r) => tbody.appendChild(r));
          headRow.querySelectorAll('th').forEach((h) => h.removeAttribute('aria-sort'));
          th.setAttribute('aria-sort', sortDir === 1 ? 'ascending' : 'descending');
          applyFilter();
        };

        th.addEventListener('click', activar);
        th.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            activar();
          }
        });
      });
    }

    render();
  }

  document.querySelectorAll('table[data-admin-table]').forEach(setup);
})();
