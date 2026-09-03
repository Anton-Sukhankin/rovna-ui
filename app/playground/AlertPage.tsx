import React from 'react';

// Эта страница исключительно для вставки через nginx-модуль в тэг <header>
export const AlertPage: React.FC = () => {
  return (
    <div className='maintenance-alert'>
      <style>
        {`
          .maintenance-alert {
            font-family: 'Museo Sans Cyrl', sans-serif;
            background-color: rgb(253, 247, 233);
            position: relative;
          }
          
          .maintenance-alert .alert-content {
            display: flex;
            gap: 12px;
            padding: 16px;
            align-items: flex-start;
          }
          
          .maintenance-alert .icon-wrapper {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #FAAD14;
            flex-shrink: 0;
          }
          
          .maintenance-alert .alert-text {
            flex: 1;
          }
          
          .maintenance-alert .title-text {
            font-weight: 600;
            font-size: 16px;
            line-height: 1.25;
            color: #343A4A;
            margin-bottom: 8px;
          }
          
          .maintenance-alert .description-text {
            font-weight: 400;
            font-size: 14px;
            line-height: 1.4;
            color: #343A4A;
          }
          
          .maintenance-alert .description-text a {
            color: #007BFB;
            text-decoration: underline;
            font-weight: 500;
          }
          
          .maintenance-alert .close-button {
            width: 24px;
            height: 24px;
            cursor: pointer;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            margin-top: 2px;
            flex-shrink: 0;
          }
          
          .maintenance-alert .close-icon {
            width: 16px;
            height: 16px;
            position: relative;
          }
          
          .maintenance-alert .close-line {
            width: 12px;
            height: 2px;
            background-color: #6C717C;
            position: absolute;
            left: 2px;
            top: 7px;
          }
          
          .maintenance-alert .close-line-1 {
            transform: rotate(45deg);
          }
          
          .maintenance-alert .close-line-2 {
            transform: rotate(-45deg);
          }
          
          /* CSS для скрытия алерта при клике на чекбокс */
          .maintenance-alert #alert-close:checked ~ .alert-content {
            display: none !important;
          }
          
          /* Скрытый чекбокс */
          .maintenance-alert .alert-checkbox {
            position: absolute;
            opacity: 0;
            pointer-events: none;
          }
        `}
      </style>

      {/* Скрытый чекбокс для CSS управления */}
      <input type='checkbox' id='alert-close' className='alert-checkbox' />

      <div className='alert-content'>
        {/* Иконка */}
        <div className='icon-wrapper'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM13 8C13 8.55229 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 17C12.5523 17 13 16.5523 13 16V12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17Z'
              fill='currentColor'
            />
          </svg>
        </div>

        {/* Контент */}
        <div className='alert-text'>
          <div className='title-text'>
            С 25.08.2025 адрес legacy.example.com не будет доступен!
          </div>
          <div className='description-text'>
            Сервисы переезжают на новый адрес — platform.example.com. Пожалуйста, обновите
            сохранённые ссылки. Если останутся вопросы напишите нам через кнопку "Помощь".
          </div>
        </div>

        {/* Кнопка закрытия */}
        <label htmlFor='alert-close' className='close-button'>
          <div className='close-icon'>
            <div className='close-line close-line-1' />
            <div className='close-line close-line-2' />
          </div>
        </label>
      </div>
    </div>
  );
};

// HTML код для вставки прямо в HTML страницу (последним элементом в <header>):
/*
<style>
  .maintenance-alert {
    font-family: 'Museo Sans Cyrl', sans-serif;
    background-color: rgb(253, 247, 233);
    position: relative;
  }
  
  .maintenance-alert .alert-content {
    display: flex;
    gap: 12px;
    padding: 16px;
    align-items: flex-start;
  }
  
  .maintenance-alert .icon-wrapper {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FAAD14;
    flex-shrink: 0;
  }
  
  .maintenance-alert .alert-text {
    flex: 1;
  }
  
  .maintenance-alert .title-text {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.25;
    color: #343A4A;
    margin-bottom: 8px;
  }
  
  .maintenance-alert .description-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: #343A4A;
  }
  
  .maintenance-alert .description-text a {
    color: #007BFB;
    text-decoration: underline;
    font-weight: 500;
  }
  
  .maintenance-alert .close-button {
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-top: 2px;
    flex-shrink: 0;
  }
  
  .maintenance-alert .close-icon {
    width: 16px;
    height: 16px;
    position: relative;
  }
  
  .maintenance-alert .close-line {
    width: 12px;
    height: 2px;
    background-color: #6C717C;
    position: absolute;
    left: 2px;
    top: 7px;
  }
  
  .maintenance-alert .close-line-1 {
    transform: rotate(45deg);
  }
  
  .maintenance-alert .close-line-2 {
    transform: rotate(-45deg);
  }
  
  .maintenance-alert #alert-close:checked ~ .alert-content {
    display: none !important;
  }
  
  .maintenance-alert .alert-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
</style>

<div class="maintenance-alert">
  <input type="checkbox" id="alert-close" class="alert-checkbox">
  
  <div class="alert-content">
    <div class="icon-wrapper">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM13 8C13 8.55229 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 17C12.5523 17 13 16.5523 13 16V12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"></path>
      </svg>
    </div>
    
    <div class="alert-text">
      <div class="title-text">
        С 25.08.2025 адрес legacy.example.com не будет доступен!
      </div>
      <div class="description-text">
        Сервисы переезжают на новый адрес — platform.example.com. Пожалуйста, обновите сохранённые ссылки. Если останутся вопросы напишите нам через кнопку "Помощь".
      </div>
    </div>
    
    <label for="alert-close" class="close-button">
      <div class="close-icon">
        <div class="close-line close-line-1"></div>
        <div class="close-line close-line-2"></div>
      </div>
    </label>
  </div>
</div>
*/
