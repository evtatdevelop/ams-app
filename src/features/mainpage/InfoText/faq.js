import React from "react";
import styles from './faq.module.scss';

export const Faq = () => {


  return (
    <article className={styles.faq}>
      <h1>Часто задаваемые вопросы (FAQ) по системе АСУЗ</h1>
      <ul>
        <li>
          <p>1. Я не могу найти нужный раздел / систему в АСУЗ.</p> 
          <p>Воспользуйтесь полем «Поиск» в правом верхнем углу главной страницы АСУЗ <a href="https://asuz.digtp.com" target="_blank" rel="noreferrer" >https://asuz.digtp.com</a>. Попробуйте указать краткое или примерное название нужной системы или сервиса. 
          <br/>Если нужная вам система / сервис отсутствует в АСУЗ, подайте заявку на доступ к ней через портал технической поддержки <a href="https://jira.digtp.com/plugins/servlet/desk/site/itsm" target="_blank" rel="noreferrer" >https://jira.digtp.com/plugins/servlet/desk/site/itsm</a> или через письмо на 55555.</p>
        </li>

        <li>
          <p>2. При входе в АСУЗ запрашивается логин / пароль. Что указать?</p>
          <p>Необходимо указать корпоративный логин и пароль, которые вы указываете при входе на ПК. Логин нужно указывать с доменом в формате DOMAIN\Login (например, EUROCHEM\IvanovAB).</p>       
        </li>

        <li>
          <p>3. Я не знаю, какие полномочия / роли мне нужно запросить в АСУЗ. Где можно посмотреть более подробные описания ролей / к кому можно обратиться за помощью?</p>
          <p>В части доступов SAP можно посмотреть каталог ролей с описанием по ссылке <a href="http://corp.sibgenco.local/self-service/DocLib/SAP/%D0%A1%D0%B2%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9_%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3_%D1%80%D0%BE%D0%BB%D0%B5%D0%B9_ERP%20%D0%A1%D0%A3%D0%AD%D0%9A.xlsx?Web=1" target="_blank" rel="noreferrer" >{decodeURI('http://corp.sibgenco.local/self-service/DocLib/SAP/%D0%A1%D0%B2%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9_%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3_%D1%80%D0%BE%D0%BB%D0%B5%D0%B9_ERP%20%D0%A1%D0%A3%D0%AD%D0%9A.xlsx?Web=1')}</a>
          <br/>Если известно название транзакции, можно найти подходящую роль в заявке на доступ SAP <a href="https://asuz.digtp.com/corpsystems/sap" target="_blank" rel="noreferrer" >https://asuz.digtp.com/corpsystems/sap</a>, ссылка «Поиск роли по транзакции» рядом с полем выбора роли.
          <br/>Также информацию можно уточнить у вашего руководителя либо у специалистов поддержки системы, к которой требуется доступ.  Для этого можно подать заявку на консультацию на портале технической поддержки <a href="https://jira.digtp.com/plugins/servlet/desk/site/itsm" target="_blank" rel="noreferrer" >https://jira.digtp.com/plugins/servlet/desk/site/itsm</a>, в разделе системы к которой требуется доступ либо в разделе поддержки АСУЗ: <a href="https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543" target="_blank" rel="noreferrer" >https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543</a>
          </p>
        </li>

        <li>
          <p>4. Нужных мне полномочий / ролей / орг. уровней нет АСУЗ. Как их добавить?</p>
          <p>Подайте заявку на добавление нужной роли / орг. уровня на портале технической поддержки по ссылке <a href="https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543" target="_blank" rel="noreferrer" >https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543</a>, раздел «Настройка ролей».</p>
        </li>

        <li>
          <p>5. Моя заявка в АСУЗ «зависла» на согласовании. Что делать?</p>
          <p>
            Есть несколько вариантов действий:
            <ul>
              <li>- вы можете связаться непосредственно с согласующим для уточнения причин задержки</li>
              <li>- если вы считаете, что согласующий указан некорректно или он отсутствует / не работает в компании, подайте заявку на портале поддержки для проверки / корректировки согласующего: <a href="https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543" target="_blank" rel="noreferrer" >https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543</a>, раздел «Настройка ролей».</li>
              <li>- если вы запросили несколько ролей / орг. уровней в одной заявке, и задержка согласования произошла на одном либо нескольких из них, вы можете пропустить данные роли / орг. уровни и направить заявку на согласование далее по маршруту.   Для этого на форме статуса заявки в нижней части нажмите кнопку «Согласовать досрочно / перейти на следующий этап». Несогласованные позиции будут отменены, и вы можете запросить их позднее отдельно при необходимости.</li>
            </ul>
          </p>
        </li>

        <li>
          <p>6. Я являюсь согласующим / исполнителем по заявкам в АСУЗ. Как настроить замещение на период моего отпуска или отсутствия?</p>
          <p>
          Настроить замещение по согласованию можно на главной странице АСУЗ <a href="https://asuz.digtp.com" target="_blank" rel="noreferrer" >https://asuz.digtp.com</a><>&nbsp;</>
          в разделе «Личный кабинет» - «Настройки моих согласование/замещений»,
          либо через заявку на портале поддержки АСУЗ <a href="https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543" target="_blank" rel="noreferrer" >https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543</a>, раздел «Настройка ролей».
          <br/>Настройка замещения по исполнению заявок осуществляется через подачу заявки на портале поддержки АСУЗ <a href="https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543" target="_blank" rel="noreferrer" >https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543</a>, раздел «Настройка ролей».     
          </p>          
        </li>

        <li>
          <p>7. При формировании заявки на доступ к SAP возникли конфликты полномочий. Что это такое и что делать?</p>
          <p>
          Определенные комбинации ролей в SAP являются нежелательными / запрещенными к одновременному присвоению.
          <br/>При попытке запроса таких комбинаций система сообщит о конфликте полномочий.
          <br/>При возникновении сообщения о конфликте есть 3 варианта действий:
          <ul>
            <li>- добавить развернутое обоснование к конфликту и повторно нажать "Отправить заявку на согласование"</li>
            <li>- удалить конфликтующую роль из заявки, и далее повторно нажать "Отправить заявку на согласование" (если конфликт не является блокирующим)</li>
            <li>- сделать запрос на отзыв конфликтующей роли из SAP через 55555 (если конфликт с присвоенной ранее ролью, и она больше не нужна в работе).</li>
          </ul>
          Памятка по конфликтам полномочий размещена по ссылке: <a href="https://asuz.digtp.com/docs/conflicts.docx" target="_blank" rel="noreferrer" >https://asuz.digtp.com/docs/conflicts.docx</a>
          <br/>В случае отсутствия реакции со стороны пользователя заявка автоматически отменяется в течение суток (требование ИБ).
          </p>          
        </li>

        <li>
          <p>8. Моего вопроса нет в списке.</p>
          <p>Подайте заявку на портале технической поддержки АСУЗ <a href="https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543" target="_blank" rel="noreferrer" >https://jira.digtp.com/plugins/servlet/desk/portal/100?requestGroup=543</a>,  раздел «Предоставление консультации».   Мы постараемся ответить на ваш вопрос.</p>

        </li>
      </ul>
    </article>
  )
}
