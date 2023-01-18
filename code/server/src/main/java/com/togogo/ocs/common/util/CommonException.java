package com.togogo.ocs.common.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonException extends Exception {

    /**
    * 异常代号
    * */
    private Integer resultCode;

    public CommonException(int resultCode){
        super();
        this.setResultCode(resultCode);
    }

    public CommonException(int resultCode,Exception e){
        super(e);
        this.setResultCode(resultCode);
    }

    public CommonException(int resultCode,String message){
        super(message);
        this.setResultCode(resultCode);
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public int getResultCode() {
        return resultCode;
    }

}
