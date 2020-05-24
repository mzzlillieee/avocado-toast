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
  ignoreTransaction: any;
}

const maxCountForTransactions = 5;

const PreviewTransactions: React.FC<PreviewTransactionsProps> = ({
  transactions, ignoreTransaction
}) => {

  const headerRef = useRef<HTMLIonListHeaderElement>(null);
  const transactionListRef = useRef<HTMLIonListElement>(null);
  return (
    <IonList ref={transactionListRef} lines="full" style={{ marginTop: '5%' }}>
      <IonListHeader
        ref={headerRef}
        id="transactionListHeader"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <h4 style={{ width: '90%', textAlign: "center", color: 'var(--ion-color-primary)' }}>Today </h4>

      </IonListHeader>

      {transactions.length > 0 &&
        transactions
          .slice(0, maxCountForTransactions)
          .map((_: any, index: number) => {
            const transaction = transactions[transactions.length - 1 - index];

            return (<TransactionItem
              transaction={transaction}
              ignoreTransaction={ignoreTransaction}
              key={index}
            />)
          })}

      {transactions.length === 0 && (
        <IonItem>
          <IonLabel>Add a transaction</IonLabel>
        </IonItem>
      )}
    </IonList>

  );
};

export default PreviewTransactions;