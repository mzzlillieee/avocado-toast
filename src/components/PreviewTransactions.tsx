import React, { useRef } from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import TransactionItem from "./TransactionItem";

interface PreviewTransactionsProps {
  transactions: any;
}

const maxCountForTransactions = 5;

const PreviewTransactions: React.FC<PreviewTransactionsProps> = ({
  transactions
}) => {
  const sortedTransactions = transactions.slice().sort((a: any, b: any) => Date.parse(a.transaction_time) - Date.parse(b.transaction_time));
  const headerRef = useRef<HTMLIonListHeaderElement>(null);
  const transactionListRef = useRef<HTMLIonListElement>(null);
  return (
    <IonList ref={transactionListRef} lines="full" style={{ marginTop: '5%', paddingLeft: '0' }}>
      <IonListHeader
        id="transactionListHeader"
        style={{ padding: '0' }}
      >
        <h4 style={{ width: '100%', textAlign: "center", color: 'var(--ion-color-primary)' }}>Recent Transactions</h4>
      </IonListHeader>

      {sortedTransactions.length > 0 &&
        sortedTransactions
          .slice(0, maxCountForTransactions)
          .map((_: any, index: number) => {
            const transaction = sortedTransactions[sortedTransactions.length - 1 - index];

            return (<TransactionItem
              transaction={transaction}
              preview={true}
              key={index}
            />)
          })}

      {sortedTransactions.length === 0 && (
        <IonItem lines='none'>
          <IonLabel style={{ marginLeft: '5%', color: "grey" }}>Add a transaction</IonLabel>
        </IonItem>
      )}
    </IonList>

  );
};

export default PreviewTransactions;