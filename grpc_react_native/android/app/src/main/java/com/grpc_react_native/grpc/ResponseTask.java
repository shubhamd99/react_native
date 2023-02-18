package com.grpc_react_native.grpc;

import android.os.AsyncTask;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.concurrent.TimeUnit;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

import static com.grpc_react_native.grpc.GRPCPackage.PORT;
import static com.grpc_react_native.grpc.GRPCPackage.HOST;


public abstract class ResponseTask extends AsyncTask<Void, Void, ResponseOrException> {
    private final Promise responsePromise;
    private ManagedChannel channel;

    protected ResponseTask(Promise responsePromise) {
        this.responsePromise = responsePromise;
    }

    protected ManagedChannel getChannel() {
        return channel;
    }

    @Override
    protected ResponseOrException doInBackground(Void... nothing) {
        try {
            channel = ManagedChannelBuilder.forAddress(HOST, PORT)
                    .usePlaintext()
                    .build();

            return new ResponseOrException(getResponse());

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            pw.flush();

            return new ResponseOrException(e);
        }
    }

    @Override
    protected void onPostExecute(ResponseOrException response) {
        try {
            if (channel != null) {
                channel.shutdown().awaitTermination(1, TimeUnit.SECONDS);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        if (response.hasResponse()) {
            responsePromise.resolve(response.getResponse());
        } else {
            responsePromise.reject(response.getException());
        }
    }

    protected abstract WritableMap getResponse();

}