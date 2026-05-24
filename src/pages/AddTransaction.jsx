import TransactionForm from '../components/TransactionForm'
import './AddTransaction.css'

export default function AddTransaction() {
  return (
    <main className="add-tx">
      <div className="add-tx__inner">
        <h1 className="add-tx__heading">Add Transaction</h1>
        <TransactionForm />
      </div>
    </main>
  )
}
