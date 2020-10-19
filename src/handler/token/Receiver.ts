import BaseEventHandler from '../../parents/BaseEventHandler'

export default class TokenReceiver {

  protected parent: BaseEventHandler

  constructor(parent: BaseEventHandler) {
    this.parent = parent
  }

}