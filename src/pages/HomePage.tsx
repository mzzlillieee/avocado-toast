import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonSlides, IonSlide, IonButton, IonModal, IonRouterLink, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import './HomePage.scss';
import { StoreContext } from '../store'
import HomePageHero from '../components/HomePageHero'
import PreviewTransactions from '../components/PreviewTransactions';
import AddTransactionModal from './AddTransactionModal';
import { useObserver } from 'mobx-react';
import balanceUtils from '../utils/balance';
import expenseUtils from '../utils/expense';


const slideOpts = {
  initialSlide: 0,
  loop: true,
  speed: 200,
  spaceBetween: 40,
  on: {
    ionSlideTouchEnd() {
      window.scrollTo(0, 0)
    }
  }
};

const HomePage: React.FC = () => {
  const store = React.useContext(StoreContext);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const maxCountForTransaction = 10;
  const pageRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLIonSlideElement>(null);



  return useObserver(() => (
    <IonPage id="home-page">
      <IonContent>
        <IonSlides
          pager={true}
          options={slideOpts}
          style={{ height: "100%", marginTop: "5%", overflowY: "scroll" }}
        >
          <IonSlide>
            <div
              style={{
                width: "100%",
                height: "100%"
              }}
            >
              <HomePageHero
                period="Daily"
                balance={balanceUtils.getTodayBalance(store.transactions, store.budget.budgetPerDay)}
                spent={expenseUtils.getTodayTotalExpenses(store.transactions)}
              />
              <PreviewTransactions
                transactions={store.transactions.slice(
                  0,
                  maxCountForTransaction
                )}
                ignoreTransaction={store.ignoreTransaction}
              />
              <IonButton
                expand='block'
                fill="outline"
                color="medium"
                href="/transactions"
                style={{ margin: '0 6% 2% 6%' }}
              >
                See All Transactions
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide ref={slideRef}>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              <HomePageHero period="Weekly" balance={balanceUtils.getThisWeekBalance(store.transactions, store.budget.budgetPerDay)} spent={expenseUtils.getThisWeekTotalExpenses(store.transactions)} />
            </div>
          </IonSlide>
          <IonSlide ref={slideRef}>
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              <HomePageHero period="Monthly" balance={balanceUtils.getThisMonthBalance(store.transactions, store.budget.budgetPerDay)} spent={expenseUtils.getThisMonthTotalExpenses(store.transactions)} />
            </div>
          </IonSlide>
        </IonSlides>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddTransactionModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonModal
        isOpen={showAddTransactionModal}
        onDidDismiss={() => setShowAddTransactionModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
      >
        <AddTransactionModal
          onClose={() => setShowAddTransactionModal(false)}
        />
      </IonModal>
    </IonPage>
  ));
};

export default HomePage;
