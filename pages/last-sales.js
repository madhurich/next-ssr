import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSales(props) {
  const [sales, setSales] = useState(props.sales);
//   const [isLoading, setIsLoading] = useState(false);
  const {data, error} = useSWR("https://next-ssr-3f202-default-rtdb.firebaseio.com/sales.json", (url) => fetch(url).then(res => res.json()))

  useEffect(() => {
    if(data) {
        const formattedData = [];
        for (let key in data) {
            formattedData.push({ id: key, ...data[key] });
        }
        setSales(formattedData)
    }
  }, [data])

//   useEffect(() => {
//     setIsLoading(true);
//     fetch("https://next-ssr-3f202-default-rtdb.firebaseio.com/sales.json")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         setIsLoading(false);
//         const formattedData = [];
//         for (let key in data) {
//           formattedData.push({ id: key, ...data[key] });
//         }
//         setSales(formattedData);
//       });
//   }, []);

  return (
    <>
      <h1>Sales</h1>
      {/* {error && <p>something went wrong</p>} */}
      {sales?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {sales.map((sale, key) => (
            <li key={key}>
              {sale.username} - {sale.volume}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export async function getStaticProps() {
    const res = await fetch("https://next-ssr-3f202-default-rtdb.firebaseio.com/sales.json")
    const data = await res.json()
    const formattedData = [];
    for (let key in data) {
        formattedData.push({ id: key, ...data[key] });
    }

    return {
        props: {
            sales: formattedData
        },
        revalidate: 5
    }
}

export default LastSales;
