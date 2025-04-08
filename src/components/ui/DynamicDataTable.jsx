const DynamicDataTable = ({ columns, data }) => {
    return (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-6 py-3">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b text-left dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                {columns.map((column) => (
                  <td
                    key={`${item.id}-${column.key}`}
                    className={`px-6 py-4 ${
                      column.key === 'name'
                        ? 'font-medium text-gray-900  text-left whitespace-nowrap dark:text-white'
                        : ''
                    }`}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default DynamicDataTable;