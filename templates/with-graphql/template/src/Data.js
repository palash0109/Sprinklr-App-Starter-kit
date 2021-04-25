import React from 'react'
import { useQuery, gql } from '@apollo/client';
import './Data.css'

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function Data() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const filterData = data.rates.slice(1,8)
  return (
    <div className="data">
        <h2>Sample Data</h2>
        <table>
        <tr>
            <th>Currency</th>
            <th>Rate</th>
        </tr>
        {
                filterData.map(({ currency, rate }) => (
                <tr key={currency}>
                    <td>{currency}</td>
                    <td>{rate}</td>
                </tr>
    
                ))
        }
        </table>
    </div>

  )
  
}

export default Data;