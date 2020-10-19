import BaseEventHandler from '../../parents/BaseEventHandler'

export default class ChatReceiver {

  protected parent: BaseEventHandler

  constructor(parent: BaseEventHandler) {
    this.parent = parent
  }

}