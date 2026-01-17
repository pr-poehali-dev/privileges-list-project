import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type Privilege = {
  id: string;
  name: string;
  description: string;
  features: string[];
  price?: string;
};

type Token = {
  id: string;
  amount: string;
  price: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
};

const privileges: Privilege[] = [
  {
    id: 'baron',
    name: 'Барон',
    description: 'Начальный статус для игроков, желающих получить преимущества на сервере.',
    features: ['Доступ к базовым командам', 'Особый префикс в чате', 'Приоритет входа на сервер'],
    price: '19 ₽'
  },
  {
    id: 'guard',
    name: 'Страж',
    description: 'Улучшенный статус с расширенными возможностями защиты и управления.',
    features: ['Все преимущества Барона', 'Команды защиты территории', 'Дополнительные слоты инвентаря', 'Доступ к эксклюзивным зонам'],
    price: '32 ₽'
  },
  {
    id: 'hero',
    name: 'Герой',
    description: 'Героический статус для опытных игроков с уникальными способностями.',
    features: ['Все преимущества Стража', 'Уникальные команды телепортации', 'Возможность создания варпов', 'Расширенный набор эмоций'],
    price: '60 ₽'
  },
  {
    id: 'aspid',
    name: 'Аспид',
    description: 'Продвинутый статус с мощными инструментами управления игровым процессом.',
    features: ['Все преимущества Героя', 'Команды управления погодой', 'Возможность полета', 'Неограниченные дома', 'Доступ к редким ресурсам'],
    price: '89 ₽'
  },
  {
    id: 'squid',
    name: 'Сквид',
    description: 'Элитный статус с эксклюзивными возможностями и привилегиями.',
    features: ['Все преимущества Аспида', 'Команды редактирования мира', 'Приоритетная поддержка', 'Уникальные косметические предметы'],
    price: '129 ₽'
  },
  {
    id: 'head',
    name: 'Глава',
    description: 'Лидерский статус с полномочиями управления и организации.',
    features: ['Все преимущества Сквида', 'Возможность создания гильдий', 'Расширенные права модерации', 'Персональный помощник'],
    price: '189 ₽'
  },
  {
    id: 'elite',
    name: 'Элита',
    description: 'Престижный статус для самых преданных игроков сообщества.',
    features: ['Все преимущества Главы', 'VIP доступ к новым функциям', 'Личная зона отдыха', 'Эксклюзивные ивенты'],
    price: '229 ₽'
  },
  {
    id: 'titan',
    name: 'Титан',
    description: 'Титанический статус с безграничными возможностями на сервере.',
    features: ['Все преимущества Элиты', 'Максимальный приоритет во всем', 'Команды управления временем', 'Неограниченные ресурсы'],
    price: '299 ₽'
  },
  {
    id: 'prince',
    name: 'Принц',
    description: 'Королевский статус с исключительными привилегиями и влиянием.',
    features: ['Все преимущества Титана', 'Возможность влиять на правила сервера', 'Персональная территория', 'Особые награды'],
    price: '399 ₽'
  },
  {
    id: 'knyaz',
    name: 'Князь',
    description: 'Благородный статус с расширенными полномочиями и уникальными привилегиями.',
    features: ['Все преимущества Принца', 'Доступ к секретным локациям', 'Особые команды управления', 'Эксклюзивные косметические эффекты', 'Приоритетная техподдержка'],
    price: '499 ₽'
  },
  {
    id: 'duke',
    name: 'Герцог',
    description: 'Высший статус для истинных легенд сервера с абсолютными привилегиями.',
    features: ['Все преимущества Князя', 'Абсолютный приоритет', 'Уникальные косметические эффекты', 'Пожизненная поддержка', 'Имя в истории сервера'],
    price: '689 ₽'
  }
];

const tokens: Token[] = [
  { id: 'token1', amount: '10 000', price: '49 ₽' },
  { id: 'token2', amount: '30 000', price: '149 ₽' },
  { id: 'token3', amount: '60 000', price: '299 ₽' },
  { id: 'token4', amount: '100 000', price: '399 ₽' },
  { id: 'token5', amount: '200 000', price: '499 ₽' },
  { id: 'token6', amount: '300 000', price: '799 ₽' },
  { id: 'token7', amount: '500 000', price: '999 ₽' },
  { id: 'token8', amount: '1 000 000', price: '1 999 ₽' },
  { id: 'token9', amount: '5 000 000', price: '6 999 ₽' }
];

const products: Product[] = [
  { id: 'donate-case', name: 'Донат кейс', description: 'Эксклюзивный кейс с редкими предметами', price: '129 ₽', icon: 'Gift' },
  { id: 'sphere-case', name: 'Кейс со сферами', description: 'Содержит магические сферы', price: '39 ₽', icon: 'Circle' },
  { id: 'talisman-case', name: 'Кейс с талисманами', description: 'Мощные талисманы для улучшения', price: '69 ₽', icon: 'Sparkles' },
  { id: 'token-case', name: 'Кейс с токенами', description: 'Случайное количество токенов', price: '13 ₽', icon: 'Coins' },
  { id: 'coin-key', name: 'Монетный ключ', description: 'Ключ для открытия монетных кейсов', price: '5 ₽', icon: 'Key' },
  { id: 'regular-case', name: 'Обычный кейс', description: 'Базовый кейс с полезными предметами', price: '5 ₽', icon: 'Package' },
  { id: 'tool-case', name: 'Инструментальный кейс', description: 'Кейс с редкими инструментами', price: '13 ₽', icon: 'Wrench' },
  { id: 'weapon-case', name: 'Оружейный кейс', description: 'Мощное оружие и улучшения', price: '13 ₽', icon: 'Sword' },
  { id: 'armor-case', name: 'Броневой кейс', description: 'Защитное снаряжение высокого уровня', price: '13 ₽', icon: 'Shield' },
  { id: 'unmute', name: 'Размут', description: 'Снятие мута с аккаунта', price: '59 ₽', icon: 'Volume2' },
  { id: 'unban', name: 'Разбан', description: 'Снятие бана с аккаунта', price: '99 ₽', icon: 'Unlock' },
  { id: 'account-restore', name: 'Восстановление аккаунта', description: 'Полное восстановление утраченного аккаунта', price: '1 ₽', icon: 'UserCheck' },
  { id: 'rights-restore', name: 'Восстановление прав', description: 'Восстановление утраченных прав и привилегий', price: '289 ₽', icon: 'Award' }
];

const Index = () => {
  const [selectedPrivilege, setSelectedPrivilege] = useState<Privilege>(privileges[0]);
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [currentPage, setCurrentPage] = useState<'home' | 'tokens' | 'products' | 'sales' | 'rules' | 'forum'>('home');

  const renderContent = () => {
    if (currentPage === 'products') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                  selectedProduct.id === product.id
                    ? 'ring-2 ring-primary'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={product.icon} size={24} className="text-primary" />
                  <h3 className="text-lg font-bold">{product.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                <p className="text-lg text-primary font-semibold">{product.price}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Icon name={selectedProduct.icon} size={48} className="text-primary" />
                <div>
                  <h2 className="text-3xl font-bold mb-1">{selectedProduct.name}</h2>
                  <p className="text-2xl text-primary font-semibold">{selectedProduct.price}</p>
                </div>
              </div>

              <div>
                <p className="text-lg">{selectedProduct.description}</p>
              </div>

              <Button size="lg" className="w-full mt-6">
                Купить {selectedProduct.name}
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    if (currentPage === 'tokens') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokens.map((token) => (
              <Card
                key={token.id}
                onClick={() => setSelectedToken(token)}
                className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                  selectedToken.id === token.id
                    ? 'ring-2 ring-primary'
                    : ''
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{token.amount} токенов</h3>
                <p className="text-lg text-primary font-semibold">{token.price}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedToken.amount} токенов</h2>
                <p className="text-2xl text-primary font-semibold">{selectedToken.price}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-lg">Внутриигровая валюта для покупок на сервере</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Что можно купить за токены:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Уникальные предметы и ресурсы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Косметические улучшения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Доступ к эксклюзивным зонам</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Особые возможности и команды</span>
                  </li>
                </ul>
              </div>

              <Button size="lg" className="w-full mt-6">
                Купить {selectedToken.amount} токенов
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    if (currentPage !== 'home') {
      return (
        <div className="flex items-center justify-center h-full">
          <Card className="p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {currentPage === 'sales' && 'Акции'}
              {currentPage === 'rules' && 'Правила'}
              {currentPage === 'forum' && 'Форум'}
            </h2>
            <p className="text-muted-foreground">Раздел в разработке</p>
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {privileges.map((privilege) => (
            <Card
              key={privilege.id}
              onClick={() => setSelectedPrivilege(privilege)}
              className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                selectedPrivilege.id === privilege.id
                  ? 'ring-2 ring-primary'
                  : ''
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{privilege.name}</h3>
              {privilege.price && (
                <p className="text-lg text-primary font-semibold mb-2">{privilege.price}</p>
              )}
              <p className="text-sm text-muted-foreground line-clamp-2">{privilege.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{selectedPrivilege.name}</h2>
              {selectedPrivilege.price && (
                <p className="text-2xl text-primary font-semibold">{selectedPrivilege.price}</p>
              )}
            </div>

            <div>
              <p className="text-muted-foreground text-lg">{selectedPrivilege.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Возможности:</h3>
              <ul className="space-y-2">
                {selectedPrivilege.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" className="w-full mt-6">
              Приобрести {selectedPrivilege.name}
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <nav className="flex items-center gap-4">
          <Button
            variant={currentPage === 'home' ? 'default' : 'ghost'}
            onClick={() => setCurrentPage('home')}
          >
            Главная
          </Button>
          <Button
            variant={currentPage === 'tokens' ? 'default' : 'ghost'}
            onClick={() => setCurrentPage('tokens')}
          >
            Токены
          </Button>
          <Button
            variant={currentPage === 'products' ? 'default' : 'ghost'}
            onClick={() => setCurrentPage('products')}
          >
            Товары
          </Button>
          <Button
            variant={currentPage === 'sales' ? 'default' : 'ghost'}
            onClick={() => setCurrentPage('sales')}
          >
            Акции
          </Button>
          <Button
            variant={currentPage === 'rules' ? 'default' : 'ghost'}
            onClick={() => setCurrentPage('rules')}
          >
            Правила
          </Button>
          <Button
            variant={currentPage === 'forum' ? 'default' : 'ghost'}
            onClick={() => setCurrentPage('forum')}
          >
            Форум
          </Button>
        </nav>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>

      <footer className="border-t border-border px-6 py-4 text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Icon name="Server" size={16} />
            <span>IP сервера: <span className="text-foreground font-medium">188.127.241.230:27753</span></span>
          </div>
          <div>
            Копирование с сайта сервера запрещено.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;