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

const privileges: Privilege[] = [
  {
    id: 'baron',
    name: 'Барон',
    description: 'Начальный статус для игроков, желающих получить преимущества на сервере.',
    features: ['Доступ к базовым командам', 'Особый префикс в чате', 'Приоритет входа на сервер'],
    price: '199 ₽'
  },
  {
    id: 'guard',
    name: 'Страж',
    description: 'Улучшенный статус с расширенными возможностями защиты и управления.',
    features: ['Все преимущества Барона', 'Команды защиты территории', 'Дополнительные слоты инвентаря', 'Доступ к эксклюзивным зонам'],
    price: '399 ₽'
  },
  {
    id: 'hero',
    name: 'Герой',
    description: 'Героический статус для опытных игроков с уникальными способностями.',
    features: ['Все преимущества Стража', 'Уникальные команды телепортации', 'Возможность создания варпов', 'Расширенный набор эмоций'],
    price: '599 ₽'
  },
  {
    id: 'aspid',
    name: 'Аспид',
    description: 'Продвинутый статус с мощными инструментами управления игровым процессом.',
    features: ['Все преимущества Героя', 'Команды управления погодой', 'Возможность полета', 'Неограниченные дома', 'Доступ к редким ресурсам'],
    price: '899 ₽'
  },
  {
    id: 'squid',
    name: 'Сквид',
    description: 'Элитный статус с эксклюзивными возможностями и привилегиями.',
    features: ['Все преимущества Аспида', 'Команды редактирования мира', 'Приоритетная поддержка', 'Уникальные косметические предметы'],
    price: '1299 ₽'
  },
  {
    id: 'head',
    name: 'Глава',
    description: 'Лидерский статус с полномочиями управления и организации.',
    features: ['Все преимущества Сквида', 'Возможность создания гильдий', 'Расширенные права модерации', 'Персональный помощник'],
    price: '1799 ₽'
  },
  {
    id: 'elite',
    name: 'Элита',
    description: 'Престижный статус для самых преданных игроков сообщества.',
    features: ['Все преимущества Главы', 'VIP доступ к новым функциям', 'Личная зона отдыха', 'Эксклюзивные ивенты'],
    price: '2499 ₽'
  },
  {
    id: 'titan',
    name: 'Титан',
    description: 'Титанический статус с безграничными возможностями на сервере.',
    features: ['Все преимущества Элиты', 'Максимальный приоритет во всем', 'Команды управления временем', 'Неограниченные ресурсы'],
    price: '3499 ₽'
  },
  {
    id: 'prince',
    name: 'Принц',
    description: 'Королевский статус с исключительными привилегиями и влиянием.',
    features: ['Все преимущества Титана', 'Возможность влиять на правила сервера', 'Персональная территория', 'Особые награды'],
    price: '4999 ₽'
  },
  {
    id: 'knyaz',
    name: 'Князь',
    description: 'Благородный статус с расширенными полномочиями и уникальными привилегиями.',
    features: ['Все преимущества Принца', 'Доступ к секретным локациям', 'Особые команды управления', 'Эксклюзивные косметические эффекты', 'Приоритетная техподдержка'],
    price: '6999 ₽'
  },
  {
    id: 'duke',
    name: 'Герцог',
    description: 'Высший статус для истинных легенд сервера с абсолютными привилегиями.',
    features: ['Все преимущества Князя', 'Абсолютный приоритет', 'Уникальные косметические эффекты', 'Пожизненная поддержка', 'Имя в истории сервера'],
    price: '9999 ₽'
  }
];

const Index = () => {
  const [selectedPrivilege, setSelectedPrivilege] = useState<Privilege>(privileges[0]);
  const [currentPage, setCurrentPage] = useState<'home' | 'sales' | 'rules' | 'forum'>('home');

  const renderContent = () => {
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
      <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6 h-full">
        <div className="space-y-2">
          {privileges.map((privilege) => (
            <button
              key={privilege.id}
              onClick={() => setSelectedPrivilege(privilege)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                selectedPrivilege.id === privilege.id
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'bg-card hover:bg-secondary text-foreground'
              }`}
            >
              {privilege.name}
            </button>
          ))}
        </div>

        <Card className="p-6 overflow-auto">
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