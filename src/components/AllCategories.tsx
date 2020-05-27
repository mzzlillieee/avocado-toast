import React from "react";
import { IonList, IonItem, IonLabel, IonIcon, IonNote, IonItemGroup } from "@ionic/react";
import { Transaction } from "../models/Transaction";
import { basketOutline } from "ionicons/icons";
import './AllCategories.scss';

const loadCategories = (transactions: Transaction[]): { [key: string]: number } => {
  const categories: { [key: string]: number } = { total: 0 };

  transactions.sort((a: Transaction, b: Transaction) => b.amount - a.amount)

  transactions.forEach((transaction: Transaction) => {
    if (categories.hasOwnProperty(transaction.category_name)) {
      categories[transaction.category_name] += transaction.amount;
    } else {
      categories[transaction.category_name] = transaction.amount;
    }
    categories.total += transaction.amount;
  });

  return categories;
};

interface AllCategoriesProps {
  transactions: Transaction[]
  period: string
}

const AllCategories: React.FC<AllCategoriesProps> = ({ period, transactions }) => {
  const categories: { [key: string]: number } = loadCategories(transactions);
  let categoryTotal = 0;
  let maxWidth = 90;

  return (
    <IonList lines="none" id="all_categories">
      <h4 style={{ width: '100%', textAlign: "center", color: 'var(--ion-color-primary)' }}>This {period}</h4>
      {Object.keys(categories).map((category_name: string) => {
        if (category_name === "total") return;

        categoryTotal = categories[category_name];

        return (
          <div key={category_name} className="categories__container">
            <IonItem class="category__item" style={{ height: '35px' }}>
              <IonIcon icon={basketOutline} slot="start" color="primary"></IonIcon>
              <IonLabel>{category_name}</IonLabel>

              <IonLabel slot="end" style={{ textAlign: "right" }}>
                -${categoryTotal}
              </IonLabel>
            </IonItem>
            <div className="categories__progress-bar" style={{ width: maxWidth + "%" }}>
              <div
                className="categories__progress-bar--inner"
                style={{
                  width: (((categoryTotal / categories.total) * maxWidth) / maxWidth) * 100 + "%",
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </IonList>
  );
};

export default AllCategories;