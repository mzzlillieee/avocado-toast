import React, { useRef, useState } from "react";
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonList,
  IonListHeader,
} from "@ionic/react";
import {
  basketOutline,
  logoAmazon,
  carOutline,
  cafeOutline,
  chevronUpOutline,
  chevronDownOutline,
} from "ionicons/icons";
import TransactionItem from "./TransactionItem";

interface PreviewTransactionsProps {
  transactions: any
}
const PreviewTransactions: React.FC<PreviewTransactionsProps> = ({
  transactions
}) => {

  const headerRef = useRef<HTMLIonListHeaderElement>(null);
  const transactionListRef = useRef<HTMLIonListElement>(null);
  const sortedTransactions = transactions.sort((a: any, b: any) => Date.parse(b.transaction_time) - Date.parse(a.transaction_time));
  return (
    <IonList ref={transactionListRef} lines="full" style={{ marginTop: '5%' }}>
      <IonListHeader
        ref={headerRef}
        id="transactionListHeader"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <h4 style={{ width: '90%', textAlign: "center", color: 'var(--ion-color-primary)' }}>Today </h4>

      </IonListHeader>

      {sortedTransactions.length > 0 &&
        sortedTransactions
          .slice(0, 10)
          .map((transaction: any, index: number) => (
            <TransactionItem
              transaction={transaction}
              key={index}
            />
          ))}

      {sortedTransactions.length === 0 && (
        <IonItem>
          <IonLabel>Add a transaction</IonLabel>
        </IonItem>
      )}
    </IonList>

  );
};

export default PreviewTransactions;