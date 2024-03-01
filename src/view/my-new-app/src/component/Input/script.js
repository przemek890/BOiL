        // Dla pierwszej tabeli (customers_table)
const search1 = document.querySelector('#customers_table .input-group input'),
    table_rows1 = document.querySelectorAll('#customers_table tbody tr'),
    table_headings1 = document.querySelectorAll('#customers_table thead th');

// Funkcja wyszukiwania dla pierwszej tabeli
search1.addEventListener('input', searchTable1);

function searchTable1() {
    table_rows1.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search1.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    });

    document.querySelectorAll('#customers_table tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// Funkcja sortowania dla pierwszej tabeli
table_headings1.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings1.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('#customers_table td').forEach(td => td.classList.remove('active'));
        table_rows1.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        });

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable1(i, sort_asc);
    };
});

// Funkcja sortowania dla pierwszej tabeli
function sortTable1(column, sort_asc) {
    [...table_rows1].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('#customers_table tbody').appendChild(sorted_row));
}

// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector('#toPDF');
const customers_table = document.querySelector('#customers_table');


const toPDF = function (customers_table) {
    const html_code = `
    <!DOCTYPE html>
    <link rel="stylesheet" type="text/css" href="style.css">
    <main class="table" id="customers_table">${customers_table.innerHTML}</main>`;

    const new_window = window.open();
     new_window.document.write(html_code);

    setTimeout(() => {
        new_window.print();
        new_window.close();
    }, 400);
}

pdf_btn.onclick = () => {
    toPDF(customers_table);
}


// 4. Converting HTML table to JSON

const json_btn = document.querySelector('#toJSON');

const toJSON = function (table) {
    let table_data = [],
        t_head = [],

        t_headings = table.querySelectorAll('th'),
        t_rows = table.querySelectorAll('tbody tr');

    for (let t_heading of t_headings) {
        let actual_head = t_heading.textContent.trim().split(' ');

        t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
    }

    t_rows.forEach(row => {
        const row_object = {},
            t_cells = row.querySelectorAll('td');

        t_cells.forEach((t_cell, cell_index) => {
            const img = t_cell.querySelector('img');
            if (img) {
                row_object['customer image'] = decodeURIComponent(img.src);
            }
            row_object[t_head[cell_index]] = t_cell.textContent.trim();
        })
        table_data.push(row_object);
    })

    return JSON.stringify(table_data, null, 4);
}

json_btn.onclick = () => {
    const json = toJSON(customers_table);
    downloadFile(json, 'json')
}

// 5. Converting HTML table to CSV File

const csv_btn = document.querySelector('#toCSV');



const toCSV = function (table) {
    const t_heads = table.querySelectorAll('th');
    const tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join(',');

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            data_without_img = [...cells].map(cell => {
                // Sprawdzenie, czy komórka zawiera obraz
                const img = cell.querySelector('img');
                if (img) {
                    return '';
                }
                return cell.textContent.replace(/,/g, ".").trim();
            }).join(',');

        return data_without_img;
    }).join('\n');

    return headings + '\n' + table_data;
}

csv_btn.onclick = () => {
    const csv = toCSV(customers_table);
    downloadFile(csv, 'csv', 'customer orders');
}

// 6. Converting HTML table to EXCEL File

const excel_btn = document.querySelector('#toEXCEL');

const toExcel = function (table) {
    const t_heads = table.querySelectorAll('th');
    const tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join('\t');

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            data_without_img = [...cells].map(cell => {
                // Sprawdzenie, czy komórka zawiera obraz
                const img = cell.querySelector('img');
                if (img) {
                    return '';
                }
                return cell.textContent.trim();
            }).join('\t');

        return data_without_img;
    }).join('\n');

    return headings + '\n' + table_data;
}

excel_btn.onclick = () => {
    const excel = toExcel(customers_table);
    downloadFile(excel, 'excel');
}

const downloadFile = function (data, fileType, fileName = '') {
    const a = document.createElement('a');
    a.download = fileName;
    const mime_types = {
        'json': 'application/json',
        'csv': 'text/csv',
        'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
    document.body.appendChild(a);
    a.click();
    a.remove();
}



//---------------


const search2 = document.querySelector('#right_table .input-group input'),
    table_rows2 = document.querySelectorAll('#right_table tbody tr'),
    table_headings2 = document.querySelectorAll('#right_table thead th');

// 1. Searching for specific data of HTML table
search2.addEventListener('input', searchTable2);

function searchTable2() {
    table_rows2.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search2.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    });

    document.querySelectorAll('#right_table tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting | Ordering data of HTML table
table_headings2.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings2.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('#right_table td').forEach(td => td.classList.remove('active'));
        table_rows2.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        });

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable2(i, sort_asc);
    };
});

function sortTable2(column, sort_asc) {
    [...table_rows2].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('#right_table tbody').appendChild(sorted_row));
}

// Dla drugiej tabeli (right_table)

// Funkcja eksportu do PDF dla drugiej tabeli
const pdf_btn_2 = document.querySelector('#toPDF1');
pdf_btn_2.onclick = () => {
    toPDF_2('#right_table');
};

// Funkcja eksportu do JSON dla drugiej tabeli
const json_btn_2 = document.querySelector('#toJSON1');
json_btn_2.onclick = () => {
    const json = toJSON_2('#right_table');
    downloadFile_2(json, 'json');
};

// Funkcja eksportu do CSV dla drugiej tabeli
const csv_btn_2 = document.querySelector('#toCSV1');
csv_btn_2.onclick = () => {
    const csv = toCSV_2('#right_table');
    downloadFile_2(csv, 'csv', 'right_table_data');
};

// Funkcja eksportu do EXCEL dla drugiej tabeli
const excel_btn_2 = document.querySelector('#toEXCEL1');
excel_btn_2.onclick = () => {
    const excel = toExcel_2('#right_table');
    downloadFile_2(excel, 'excel', 'right_table_data');
};

// Functions for first table (customers_table) can be similarly defined


// Funkcja eksportu do PDF dla drugiej tabeli
const toPDF_2 = function (tableId) {
    const table = document.querySelector(tableId);
    const html_code = `
    <!DOCTYPE html>
    <link rel="stylesheet" type="text/css" href="style.css">
    <main class="table" id="right_table">${table.innerHTML}</main>`;

    const new_window = window.open();
    new_window.document.write(html_code);

    setTimeout(() => {
        new_window.print();
        new_window.close();
    }, 400);
};

// Funkcja eksportu do JSON dla drugiej tabeli
const toJSON_2 = function (tableId) {
    const table = document.querySelector(tableId);
    let table_data = [],
        t_head = [],

        t_headings = table.querySelectorAll('th'),
        t_rows = table.querySelectorAll('tbody tr');

    for (let t_heading of t_headings) {
        let actual_head = t_heading.textContent.trim().split(' ');

        t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
    }

    t_rows.forEach(row => {
        const row_object = {},
            t_cells = row.querySelectorAll('td');

        t_cells.forEach((t_cell, cell_index) => {
            const img = t_cell.querySelector('img');
            if (img) {
                row_object['customer image'] = decodeURIComponent(img.src);
            }
            row_object[t_head[cell_index]] = t_cell.textContent.trim();
        });
        table_data.push(row_object);
    });

    return JSON.stringify(table_data, null, 4);
};

// Funkcja eksportu do CSV dla drugiej tabeli
const toCSV_2 = function (tableId) {
    const table = document.querySelector(tableId);
    const t_heads = table.querySelectorAll('th');
    const tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join(',');

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            data_without_img = [...cells].map(cell => {
                // Sprawdzenie, czy komórka zawiera obraz
                const img = cell.querySelector('img');
                if (img) {
                    return '';
                }
                return cell.textContent.replace(/,/g, ".").trim();
            }).join(',');

        return data_without_img;
    }).join('\n');

    return headings + '\n' + table_data;
};

// Funkcja eksportu do EXCEL dla drugiej tabeli
const toExcel_2 = function (tableId) {
    const table = document.querySelector(tableId);
    const t_heads = table.querySelectorAll('th');
    const tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join('\t');

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            data_without_img = [...cells].map(cell => {
                // Sprawdzenie, czy komórka zawiera obraz
                const img = cell.querySelector('img');
                if (img) {
                    return '';
                }
                return cell.textContent.trim();
            }).join('\t');

        return data_without_img;
    }).join('\n');

    return headings + '\n' + table_data;
};

const downloadFile_2 = function (data, fileType, fileName = '') {
    const a = document.createElement('a');
    a.download = fileName;
    const mime_types = {
        'json': 'application/json',
        'csv': 'text/csv',
        'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
    document.body.appendChild(a);
    a.click();
    a.remove();
};


//-----------------------------------------------------------------edycja tabeli-------------------------------------------


// Funkcja obsługująca kliknięcie w komórkę tabeli
const handleCellClick = function(event) {
    const target = event.target;
    if (target.tagName === 'TD') {
        const currentValue = target.textContent.trim();
        const input = document.createElement('input');
        input.value = currentValue;
        input.style.width = target.offsetWidth ;
        input.style.height = target.offsetHeight ;
        input.style.boxSizing = 'border-box';
        input.style.padding = '5px';
        input.style.margin = '0';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '3px';
        input.style.fontSize = 'inherit';
        input.style.fontFamily = 'inherit';
        input.style.textAlign = 'center';

        // Po utworzeniu pola input, zastępujemy nim komórkę tabeli
        target.innerHTML = '';
        target.appendChild(input);

        // Obsługa zdarzenia zatwierdzenia nowej wartości po wciśnięciu Enter
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                target.textContent = input.value;
            }
        });

        // Ustawienie fokusa na polu input po jego utworzeniu
        input.focus();
    }
};

// Dodanie obsługi zdarzeń do wszystkich komórek tabeli customers_table
const tableCells1 = document.querySelectorAll('#customers_table tbody td');
tableCells1.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Dodanie obsługi zdarzeń do wszystkich komórek tabeli
const tableCells = document.querySelectorAll('#right_table tbody td');
tableCells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

//---------------------------------------------------------przyciski dodające wiersz

// Funkcja do dodawania wiersza do tabeli
function addRow(tableId) {
    const table = document.getElementById(tableId); // Pobierz tabelę na podstawie id
    const tbody = table.querySelector('tbody'); // Pobierz element tbody tabeli

    // Pobierz ostatni wiersz w tabeli
    const lastRow = tbody.querySelector('tr:last-child');

    // Pobierz wartość id ostatniego wiersza
    let lastId = lastRow ? parseInt(lastRow.querySelector('td:first-child').textContent) : 0;

    // Stwórz nowy wiersz
    const newRow = document.createElement('tr');

    // Ustaw wartość id nowego wiersza na wartość większą o 1 od ostatniego id
    newRow.innerHTML = `
        <td>${lastId + 1}</td>
        <td></td>
        <td></td>
        <td></td>
    `;

    // Dodaj nowy wiersz do tabeli
    tbody.appendChild(newRow);
}

// Dodaj obsługę kliknięcia dla przycisków "Dodaj wiersz" dla obu tabel
document.getElementById('addRowButton_customers').addEventListener('click', () => {
    addRow('customers_table');
});

document.getElementById('addRowButton_right').addEventListener('click', () => {
    addRow('right_table');
});