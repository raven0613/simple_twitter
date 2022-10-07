<template>
  <div>
    <div class="modal__container tweet-modal__container">
      <!-- 最上方的區塊 -->
      <div class="modal__input__container">
        <img
          src="../assets/images/cancel-orange.svg"
          alt=""
          class="modal__input--cancel"
        />
      </div>
      <!-- 輸入框是個表格 -->
      <form class="tweet__input">
        <div class="tweet__input--info__container">
          <div class="tweet__input--avatar">
            <img src="../assets/images/avatar.svg" alt="" />
          </div>
          <textarea
            wrap="hard" 
            class="tweet__input--content"
            name="description"
            type="text"
            placeholder="有什麼新鮮事？"
            autocomplete="off"
            autofocus
          ></textarea>
          <!-- 用input不能自動換行，所以要用textarea -->
        </div>
        <div class="tweet__input--button__container">
          <div class="tweet__input--warning">字數不可超過<span class="montserrat-font">140</span>字</div>
          <button type="submit" class="tweet__input--button">推文</button>
        </div>
      </form>
    </div>
  </div>
</template>